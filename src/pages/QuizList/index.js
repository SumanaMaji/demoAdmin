import React, { Component } from "react";
import Preview from "../Component/preview";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import {
  Container,
  Row,
  Col,
  Tooltip,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Label,
  Input,
  Form,
  Button,
  FormGroup,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KnowCustomer from "./knowCustomer";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import HttpClient from "./../../utils/HttpClient";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      tooltipOpen: false,
      result: [],
      data: [],
      monthDate: new Date(),
      modal_static: false,
      cardLoop: [1, 2, 3, 4],
      question: [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        },
      ],
      questionObj: {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      quizName: "",
      startDate: new Date(),
      endDate: new Date(),
      userId: "",
      userDetails: {},
      giftCard: [],
      giftCardSelected: [],
    };
    this.toggleTab = this.toggleTab.bind(this);
    // this.handleMonthChange = this.handleMonthChange.bind(this);
    this.tog_CardModal = this.tog_CardModal.bind(this);
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        this.setState({
          activeTab: tab,
        });
      }
    }
  }
  handleMonthChange(date, type) {
    if (type == "startDate") {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
  }
  tog_CardModal() {
    this.setState((prevState) => ({
      modal_static: !prevState.modal_static,
    }));
    // this.removeBodyCss();
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    let user = await reactLocalStorage.getObject("userData");
    if (user != null && Object.keys(user).length > 0) {
      this.setState({ userId: user.id, userDetails: user });
      this.fetch();
      this.fetchCard();
    } else {
    }
  };

  fetchCard = async () => {
    let sendData = { owner_id: this.state.userId };
    let result = await HttpClient.requestData(
      "app-owner/gift-card/fetch-all",
      "POST",
      sendData
    );
    console.log("result", result);
    if (result && result.status > 0) {
      this.setState({ giftCard: result.data });
    } else {
    }
  };

  fetch = async () => {
    let sendData = {
      owner_id: this.state.userId,
    };
    let result = await HttpClient.requestData("app-owner/quiz/fetch-all", "POST",sendData);
    console.log("result", result);
    if (result && result.status > 0) {
      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          type:element.type,
          quizName: element.quizName,
          startDate:moment(element.startDate).format('L'),
          endDate:moment(element.endDate).format('L'),
          // options: (
          //   <ul>
          //     {op.map((item, index) => {
          //       return <li>{item}</li>;
          //     })}
          //   </ul>
          // ),
          // ans: element.ans,
          action: (
            <>
              <button title="Delete" className="btn btn-danger mr-2">
                <i className="fa fa-trash" />
              </button>
              <button title="Edit" className="btn btn-primary">
                <i className="fa fa-edit" />
              </button>
            </>
          ),
        };
        i++;
        data.push(rows);
      });
      this.setState({
        data: data,
      });
    } else {
      this.setState({
        data: [],
      });
    }
  };

  blankChk = (index) => {
    if (
      this.state.question[index].answer != "" &&
      this.state.question[index].question != "" &&
      this.state.question[index].option1 != "" &&
      this.state.question[index].option2 != "" &&
      this.state.question[index].option3 != "" &&
      this.state.question[index].option4 != ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  optionChk = (index) => {
    if (
      this.state.question[index].answer == this.state.question[index].option1 ||
      this.state.question[index].answer == this.state.question[index].option2 ||
      this.state.question[index].answer == this.state.question[index].option3 ||
      this.state.question[index].answer == this.state.question[index].option4
    ) {
      return true;
    } else {
      return false;
    }
  };

  formValid = async () => {
    if (
      this.state.quizName != "" &&
      this.state.startDate != "" &&
      this.state.endDate != ""
    ) {
      const startDate = moment(this.state.startDate);
      const timeEnd = moment(this.state.endDate);
      const diff = timeEnd.diff(startDate);
      const diffDuration = moment.duration(diff);
      if (diffDuration.days() > 0) {
        let blank = this.blankChk(0);
        console.log("blank", blank);
        if (blank) {
          let option = this.optionChk(0);
          console.log("option", option);

          if (option) {
            this.tog_CardModal();
          } else {
            alert("Answer Must Be In Options");
          }
        } else {
          alert("Please Add Atleast One Question.");
        }
      } else {
        alert("Invalid End Date Details.");
      }
    } else {
      alert("Please Fillup Details. ll");
    }
  };

  submitFrom = async () => {
    this.tog_CardModal();
    let data = {
      data: this.state.question,
      owner_id: this.state.userId,
      type:'Quiz',
      quizName:this.state.quizName,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      giftCard:this.state.giftCardSelected
    };
    let result = await HttpClient.requestData("app-owner/quiz", "POST", data);
    console.log("result", result);
    if (result && result.status) {
      this.fetch();
      alert("Successfully Submited.");
      // this.setState({
      //   monitize: [
      //     {
      //       loyaltyNumber: "",
      //       sheduleDate: new Date(),
      //       message: "",
      //       expireDate: new Date(),
      //       type: "Loyalty Card",
      //     },
      //   ],
      //   monitizeScratch: [
      //     {
      //       loyaltyNumber: "",
      //       sheduleDate: new Date(),
      //       message: "",
      //       expireDate: new Date(),
      //       type: "Scratch Card",
      //     },
      //   ],
      // });
    }
    else
    {
      alert(result.error);
    }
  };

  render() {
    const data = {
      columns: [
        {
          label: "Sl.",
          field: "sl",
          sort: "asc",
          width: 150,
        },
        {
          label: "Quiz Name",
          field: "quizName",
          sort: "asc",
          width: 270,
        },
        {
          label: "Type",
          field: "type",
          sort: "asc",
          width: 270,
        },
        {
          label: "Start Date",
          field: "startDate",
          sort: "asc",
          width: 150,
        },
        {
          label: "End Date",
          field: "endDate",
          sort: "asc",
          width: 150,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 100,
        },
      ],
      rows: this.state.data
        
    };
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xl={8}>
                <div>
                  <div>
                    <h3 className="title-editor py-1 text-center">
                      Gamify{" "}
                      <i
                        className="fa fa-info-circle display_tooltip"
                        id="TooltipInfo"
                      />
                      <Tooltip
                        placement="top"
                        isOpen={this.state.tooltipOpen}
                        target="TooltipInfo"
                        toggle={this.toggle}
                        autohide={false}
                      >
                        Refresh your mind with our quizes
                      </Tooltip>
                    </h3>
                  </div>
                  <div
                    id="basic-pills-wizard"
                    className="twitter-bs-wizard bg-white"
                  >
                    <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === 1,
                          })}
                          onClick={() => {
                            this.toggleTab(1);
                          }}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title">Quizlist</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === 2,
                          })}
                          onClick={() => {
                            this.toggleTab(2);
                          }}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title">Know Your Customer</span>
                        </NavLink>
                      </NavItem>
                    </ul>
                    <TabContent
                      activeTab={this.state.activeTab}
                      className="twitter-bs-wizard-tab-content pt-0"
                    >
                      <TabPane tabId={1}>
                        <Form className="card p-3">
                          <h4>Add your question modules</h4>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Label for="quiz-input1">Quiz Name</Label>
                                <Input
                                  className="form-control"
                                  type="text"
                                  defaultValue=""
                                  id="quiz-input1"
                                  placeholder="Enter Quiz Name..."
                                  onChange={(val) => {
                                    this.setState({
                                      quizName: val.target.value,
                                    });
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="3">
                              <FormGroup>
                                <Label>Start Date</Label>
                                <InputGroup>
                                  <DatePicker
                                    selected={this.state.startDate}
                                    className="form-control"
                                    onChange={(e) => {
                                      this.handleMonthChange(e, "startDate");
                                    }}
                                    showMonthDropdown
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col lg="3">
                              <FormGroup>
                                <Label>Expire Date</Label>
                                <InputGroup>
                                  <DatePicker
                                    selected={this.state.endDate}
                                    className="form-control"
                                    onChange={(e) => {
                                      this.handleMonthChange(e, "endDate");
                                    }}
                                    showMonthDropdown
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>

                            {this.state.question.map((item, index) => {
                              return (
                                <>
                                  <Col lg="12">
                                    <FormGroup>
                                      <Label for="question-input1">
                                        Describe Question
                                      </Label>
                                      <textarea
                                        id="question-input1"
                                        className="form-control"
                                        rows="2"
                                        placeholder="Enter your question here..."
                                        onChange={(val) => {
                                          this.state.question[index].question =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      ></textarea>
                                    </FormGroup>
                                  </Col>
                                  <Col lg="6">
                                    <FormGroup>
                                      <Label for="option-input1">
                                        Option 1
                                      </Label>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        defaultValue=""
                                        id="option-input1"
                                        placeholder="Enter option 1..."
                                        onChange={(val) => {
                                          this.state.question[index].option1 =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="option-input2">
                                        Option 2
                                      </Label>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        defaultValue=""
                                        id="option-input2"
                                        placeholder="Enter option 2..."
                                        onChange={(val) => {
                                          this.state.question[index].option2 =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="6">
                                    <FormGroup>
                                      <Label for="option-input3">
                                        Option 3
                                      </Label>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        defaultValue=""
                                        id="option-input3"
                                        placeholder="Enter option 3..."
                                        onChange={(val) => {
                                          this.state.question[index].option3 =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="option-input4">
                                        Option 4
                                      </Label>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        defaultValue=""
                                        id="option-input4"
                                        placeholder="Enter option 4..."
                                        onChange={(val) => {
                                          this.state.question[index].option4 =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col lg="6">
                                    <FormGroup>
                                      <Label for="answer-input1">
                                        Describe Answer
                                      </Label>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        defaultValue=""
                                        id="answer-input1"
                                        placeholder="Enter your answer..."
                                        onChange={(val) => {
                                          this.state.question[index].answer =
                                            val.target.value;
                                          this.setState({});
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="6">
                                    <FormGroup className="mb-0">
                                      <div className="button-items pt-4">
                                        {this.state.question.length - 1 ==
                                        index ? (
                                          <>
                                            <Button
                                              color="danger"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                              onClick={() => {
                                                if (
                                                  this.state.question.length > 1
                                                ) {
                                                  // this.state.question.pop(
                                                  //   index
                                                  // );
                                                  let indexx = this.state.question.indexOf(
                                                    item
                                                  );

                                                  // return;

                                                  if (indexx > -1) {
                                                    this.state.question.splice(
                                                      indexx,
                                                      1
                                                    );
                                                  }
                                                  console.log(
                                                    "after pop",
                                                    this.state.question
                                                  );

                                                  this.setState({});
                                                  console.log(
                                                    "after pop",
                                                    this.state.question
                                                  );
                                                }
                                              }}
                                            >
                                              <i className="ri-close-line align-middle mr-1"></i>{" "}
                                              Delete
                                            </Button>
                                            <Button
                                              color="secondary"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                              onClick={() => {
                                                this.setState({});
                                                let blank = this.blankChk(
                                                  index
                                                );
                                                if (blank) {
                                                  let option = this.optionChk(
                                                    index
                                                  );
                                                  console.log("option", option);
                                                  let questionObj = {
                                                    question: "",
                                                    option1: "",
                                                    option2: "",
                                                    option3: "",
                                                    option4: "",
                                                    answer: "",
                                                  };
                                                  if (option) {
                                                    this.state.question.push(
                                                      questionObj
                                                    );
                                                    this.setState({});
                                                    console.log(
                                                      "optionindexx",
                                                      this.state.question
                                                    );
                                                  } else {
                                                    alert(
                                                      "Answer Must Be In Options"
                                                    );
                                                  }
                                                } else {
                                                  alert(
                                                    "Quiz Must Not Be Blank"
                                                  );
                                                }
                                              }}
                                            >
                                              Add More{" "}
                                              <i className="ri-add-fill align-middle ml-1"></i>
                                            </Button>
                                          </>
                                        ) : (
                                          <Button
                                            color="danger"
                                            type="button"
                                            className="waves-effect waves-light mr-1"
                                            onClick={() => {
                                              if (
                                                this.state.question.length > 1
                                              ) {
                                                let indexx = this.state.question.indexOf(
                                                  item
                                                );

                                                // return;

                                                if (indexx > -1) {
                                                  this.state.question.splice(
                                                    indexx,
                                                    1
                                                  );
                                                }
                                                this.setState({});
                                                console.log(
                                                  "after pop",
                                                  this.state.question
                                                );
                                              }
                                            }}
                                          >
                                            <i className="ri-close-line align-middle mr-1"></i>{" "}
                                            Delete
                                          </Button>
                                        )}
                                      </div>
                                    </FormGroup>
                                  </Col>
                                </>
                              );
                            })}

                            <Col lg="6">
                              <FormGroup className="mb-0">
                                <div className="button-items pt-4">
                                  <Button
                                    color="primary"
                                    type="button"
                                    className="waves-effect waves-light mr-1"
                                    onClick={() => {
                                      this.formValid();
                                    }}
                                  >
                                    Submit{" "}
                                    <i className="ri-arrow-right-line align-middle ml-1"></i>
                                  </Button>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                        <div className="card px-3 pt-0">
                          {/* <h4>Manage your quizes</h4>
                          <MDBDataTable responsive bordered data={data} /> */}
                        </div>
                      </TabPane>
                      <TabPane tabId={2}>
                        <KnowCustomer />
                      </TabPane>
                    </TabContent>
                  </div>
                  <Modal
                    isOpen={this.state.modal_static}
                    toggle={this.tog_CardModal}
                    backdrop="static"
                  >
                    <ModalHeader
                      toggle={() => this.setState({ modal_static: false })}
                      className="bg-light"
                    >
                      Choose card
                    </ModalHeader>
                    <ModalBody>
                      <h5 className="mb-3">Select card for your quiz</h5>
                      {this.state.giftCard.map((item, index) => {
                        return (
                          <div
                            className="custom-control custom-checkbox mb-3"
                            key={index}
                          >
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id={"CustomCheck1" + index}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  let check = this.state.giftCardSelected.filter(
                                    (it) => it.id == item.id
                                  );
                                  if (check.length == 0) {
                                    this.state.giftCardSelected.push(item);
                                    this.setState({});
                                  } else {
                                  }
                                } else {
                                  let ind = this.state.giftCardSelected.indexOf(
                                    item
                                  );
                                  if (ind > -1) {
                                    this.state.giftCardSelected.splice(ind, 1);
                                    this.setState({});
                                  }
                                }
                              }}
                            />
                            <Label
                              className="custom-control-label"
                              htmlFor={"CustomCheck1" + index}
                            >
                              Card : {item.loyaltyNumber + " - " + item.type}
                            </Label>
                          </div>
                        );
                      })}
                      <ModalFooter>
                        <Button
                          type="button"
                          color="light"
                          onClick={() => this.setState({ modal_static: false })}
                        >
                          Close
                        </Button>
                        <Button type="button" color="primary" onClick={()=>{
                          this.submitFrom();
                        }}>
                          Save
                        </Button>
                      </ModalFooter>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
              <Col xl={4}>
                {/* app preview here */}
                <div>
                  <Preview />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <div className="card p-3">
                  <MDBDataTable responsive bordered data={data} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
