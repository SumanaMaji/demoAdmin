import React, { Component } from "react";
import Preview from "../Component/preview";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tooltip,
  Card,
  CardBody,
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
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { reactLocalStorage } from "reactjs-localstorage";
import HttpClient from "./../../utils/HttpClient";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      tooltipOpen: false,
      monthDate: new Date(),
      monitize: [
        {
          loyaltyNumber: "",
          sheduleDate: new Date(),
          message: "",
          expireDate: new Date(),
          type: "Loyalty Card",
        },
      ],
      monitizeObj: {
        loyaltyNumber: "",
        sheduleDate: new Date(),
        message: "",
        expireDate: new Date(),
        type: "Loyalty Card",
      },
      monitizeScratch: [
        {
          loyaltyNumber: "",
          sheduleDate: new Date(),
          message: "",
          expireDate: new Date(),
          type: "Scratch Card",
        },
      ],
      monitizeScratchObj: {
        loyaltyNumber: "",
        sheduleDate: new Date(),
        message: "",
        expireDate: new Date(),
        type: "Scratch Card",
      },
      userId: "",
      userDetails: {},
      data: [],
      result:[]
    };
    this.toggleTab.bind(this);
    // this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  async componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    let user = await reactLocalStorage.getObject("userData");
    if (user != null && Object.keys(user).length > 0) {
      this.setState({ userId: user.id, userDetails: user });
      this.fetch();
    } else {
    }
  };

  handleMonthChange(date, type, indexx, field) {
    if (type == "loyalty") {
      if (field == "sheduleDate") {
        this.state.monitize[indexx].sheduleDate = date;
        this.setState({});
      } else {
        this.state.monitize[indexx].expireDate = date;
        this.setState({});
      }
    } else {
      if (field == "sheduleDate") {
        this.state.monitizeScratch[indexx].sheduleDate = date;
        this.setState({});
      } else {
        this.state.monitizeScratch[indexx].expireDate = date;
        this.setState({});
      }
    }

    // this.setState({ monthDate: date });
  }
  blankChk = (index, type) => {
    let data = [];
    if (type == "loyalty") {
      data = this.state.monitize;
    } else {
      data = this.state.monitizeScratch;
    }
    if (
      data[index].loyaltyNumber != "" &&
      data[index].expireDate != "" &&
      data[index].sheduleDate != ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  dateChk = (index, type) => {
    let data = [];
    if (type == "loyalty") {
      data = this.state.monitize;
    } else {
      data = this.state.monitizeScratch;
    }
    if (data[index].expireDate == data[index].sheduleDate) {
      return false;
    } else {
      const startDate = moment(data[index].sheduleDate);
      const timeEnd = moment(data[index].expireDate);
      const diff = timeEnd.diff(startDate);
      const diffDuration = moment.duration(diff);
      if (diffDuration.days() > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

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
  submitFrom = async () => {
    let data = {
      data:
        this.state.activeTab == "1"
          ? this.state.monitize
          : this.state.monitizeScratch,
      owner_id: this.state.userId,
    };
    let result = await HttpClient.requestData(
      "app-owner/gift-card",
      "POST",
      data
    );
    console.log("result", result);
    if (result && result.status) {
      this.fetch();
      alert("Successfully Submited.");
      this.setState({
        monitize: [
          {
            loyaltyNumber: "",
            sheduleDate: new Date(),
            message: "",
            expireDate: new Date(),
            type: "Loyalty Card",
          },
        ],
        monitizeScratch: [
          {
            loyaltyNumber: "",
            sheduleDate: new Date(),
            message: "",
            expireDate: new Date(),
            type: "Scratch Card",
          },
        ],
      });
    }
  };

  async fetch() {
    let sendData = {
      owner_id: this.state.userId,
    };
    let result = await HttpClient.requestData(
      "app-owner/gift-card/fetch-all",
      "POST",
      sendData
    );

    if (result && result.status > 0) {
      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          type:element.type,
          card: element.loyaltyNumber,
          mssg: element.message,
          start: moment(element.sheduleDate).format("L"),
          expire: moment(element.expireDate).format("L"),
          action: (
            <>
              <button title="Delete" className="btn btn-danger mr-2" onClick={()=>{ this.del(element)}}>
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
  }

  del = async (item) => {
    let sendData = {
      id:item._id
    }
    let result = await HttpClient.requestData(
      "app-owner/gift-card/delete",
      "POST",
      sendData
    );
    if(result && result.status)
    {
      let index = this.state.result.indexOf(
        item
      );
      if(index>-1)
      {
        this.state.result.splice(index,1);
        this.setState({});
        let data = [];
        let i = 1;
        this.state.result.forEach((element, index) => {
          let rows = {
            sl: i,
            type:element.type,
            card: element.loyaltyNumber,
            mssg: element.message,
            start: moment(element.sheduleDate).format("L"),
            expire: moment(element.expireDate).format("L"),
            action: (
              <>
                <button title="Delete" className="btn btn-danger mr-2" onClick={()=>{ this.del(element)}}>
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
        this.setState({data:data})
      }
    }
  }

  render() {
    const cardData = {
      columns: [
        {
          label: "Sl.",
          field: "sl",
          sort: "asc",
          width: 150,
        },
        {
          label: "Card Type",
          field: "type",
          sort: "asc",
          width: 150,
        },
        {
          label: "Card Number",
          field: "card",
          sort: "asc",
          width: 150,
        },
        {
          label: "Message",
          field: "mssg",
          sort: "asc",
          width: 270,
        },
        {
          label: "Start date",
          field: "start",
          sort: "asc",
          width: 150,
        },
        {
          label: "Expire date",
          field: "expire",
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
      rows: this.state.data,
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
                      Monitization{" "}
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
                        Monitize your app with scratch card and loyalty card
                      </Tooltip>
                    </h3>
                  </div>
                  <Card>
                    <CardBody>
                      <div
                        id="basic-pills-wizard"
                        className="twitter-bs-wizard"
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
                              <span className="step-title">Loyalty Card</span>
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
                              <span className="step-title">Scratch Card</span>
                            </NavLink>
                          </NavItem>
                        </ul>
                        <TabContent
                          activeTab={this.state.activeTab}
                          className="twitter-bs-wizard-tab-content"
                        >
                          <TabPane tabId={1}>
                            <Form>
                              {this.state.monitize.map((item, index) => {
                                return (
                                  <Row>
                                    <Col lg="6">
                                      <FormGroup>
                                        <Label for="loyalty-input1">
                                          Loyalty Number
                                        </Label>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          defaultValue=""
                                          id="loyalty-input"
                                          placeholder="Enter loyalty number..."
                                          onChange={(val) => {
                                            this.state.monitize[
                                              index
                                            ].loyaltyNumber = val.target.value;
                                            this.setState({});
                                          }}
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="message-input1">
                                          Describe message (Optional)
                                        </Label>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          defaultValue=""
                                          id="message-input1"
                                          placeholder="Enter message here..."
                                          onChange={(val) => {
                                            this.state.monitize[index].message =
                                              val.target.value;
                                            this.setState({});
                                          }}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      <FormGroup>
                                        <Label>Shedule Date</Label>
                                        <InputGroup>
                                          <DatePicker
                                            selected={
                                              this.state.monitize[index]
                                                .sheduleDate
                                            }
                                            className="form-control"
                                            onChange={(e) =>
                                              this.handleMonthChange(
                                                e,
                                                "loyalty",
                                                index,
                                                "sheduleDate"
                                              )
                                            }
                                            showMonthDropdown
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Expire Date</Label>
                                        <InputGroup>
                                          <DatePicker
                                            selected={
                                              this.state.monitize[index]
                                                .expireDate
                                            }
                                            className="form-control"
                                            onChange={(e) =>
                                              this.handleMonthChange(
                                                e,
                                                "loyalty",
                                                index,
                                                "expireDate"
                                              )
                                            }
                                            showMonthDropdown
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                    </Col>

                                    <Col lg="6">
                                      <FormGroup className="mb-4">
                                        {this.state.monitize.length - 1 ==
                                        index ? (
                                          <div className="button-items">
                                            <Button
                                              color="success"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              All{index}
                                            </Button>
                                            <Button
                                              color="warning"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              Select
                                            </Button>
                                            <Button
                                              color="dark"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              Group
                                            </Button>
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      <FormGroup className="mb-0">
                                        {this.state.monitize.length - 1 ==
                                        index ? (
                                          <div className="button-items">
                                            <Button
                                              color="danger"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                              onClick={() => {
                                                if (
                                                  this.state.monitize.length > 1
                                                ) {
                                                  let indexx = this.state.monitize.indexOf(
                                                    item
                                                  );
                                                  if (indexx > -1) {
                                                    this.state.monitize.splice(
                                                      indexx,
                                                      1
                                                    );
                                                  }
                                                  this.setState({});
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
                                                  index,
                                                  "loyalty"
                                                );
                                                if (blank) {
                                                  let option = this.dateChk(
                                                    index,
                                                    "loyalty"
                                                  );

                                                  if (option) {
                                                    this.state.monitize.push(
                                                      this.state.monitizeObj
                                                    );
                                                    this.setState({});
                                                  } else {
                                                    alert(
                                                      "Invalid Expire Date"
                                                    );
                                                  }
                                                } else {
                                                  alert(
                                                    "Please Fill Up Required Details"
                                                  );
                                                }
                                              }}
                                            >
                                              Add More{" "}
                                              <i className="ri-add-fill align-middle ml-1"></i>
                                            </Button>
                                          </div>
                                        ) : (
                                          <div className="button-items">
                                            <Button
                                              color="danger"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                              onClick={() => {
                                                if (
                                                  this.state.monitize.length > 1
                                                ) {
                                                  let indexx = this.state.monitize.indexOf(
                                                    item
                                                  );
                                                  if (indexx > -1) {
                                                    this.state.monitize.splice(
                                                      indexx,
                                                      1
                                                    );
                                                  }
                                                  this.setState({});
                                                }
                                              }}
                                            >
                                              <i className="ri-close-line align-middle mr-1"></i>{" "}
                                              Delete
                                            </Button>
                                          </div>
                                        )}
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                );
                              })}
                              <Row>
                                <Col lg="12">
                                  <FormGroup className="mb-0">
                                    <div className="button-items pt-4">
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={() => {
                                          this.submitFrom();
                                        }}
                                      >
                                        Live Now{" "}
                                        <i className="ri-arrow-right-line align-middle ml-1"></i>
                                      </Button>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                            {/* <h4>Your Loyalty Cards</h4>
                            <MDBDataTable responsive bordered data={cardData} /> */}
                          </TabPane>
                          <TabPane tabId={2}>
                            <Form>
                              {this.state.monitizeScratch.map((item, index) => {
                                return (
                                  <Row>
                                    <Col lg="6">
                                      <FormGroup>
                                        <Label for="scratch-input1">
                                          Scratch Card Number
                                        </Label>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          defaultValue=""
                                          id="scratch-input"
                                          placeholder="Enter scratch card number..."
                                          onChange={(val) => {
                                            this.state.monitizeScratch[
                                              index
                                            ].loyaltyNumber = val.target.value;
                                            this.setState({});
                                          }}
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="message-input1">
                                          Describe message (Optional)
                                        </Label>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          defaultValue=""
                                          id="message-input1"
                                          placeholder="Enter message here..."
                                          onChange={(val) => {
                                            this.state.monitizeScratch[
                                              index
                                            ].message = val.target.value;
                                            this.setState({});
                                          }}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      <FormGroup>
                                        <Label>Shedule Date</Label>
                                        <InputGroup>
                                          <DatePicker
                                            selected={
                                              this.state.monitizeScratch[index]
                                                .sheduleDate
                                            }
                                            className="form-control"
                                            onChange={(e) =>
                                              this.handleMonthChange(
                                                e,
                                                "Scratch",
                                                index,
                                                "sheduleDate"
                                              )
                                            }
                                            showMonthDropdown
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Expire Date</Label>
                                        <InputGroup>
                                          <DatePicker
                                            selected={
                                              this.state.monitizeScratch[index]
                                                .expireDate
                                            }
                                            className="form-control"
                                            onChange={(e) =>
                                              this.handleMonthChange(
                                                e,
                                                "Scratch",
                                                index,
                                                "expireDate"
                                              )
                                            }
                                            showMonthDropdown
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                    </Col>

                                    <Col lg="6">
                                      <FormGroup className="mb-4">
                                        {this.state.monitizeScratch.length -
                                          1 ==
                                        index ? (
                                          <div className="button-items">
                                            <Button
                                              color="success"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              All
                                            </Button>
                                            <Button
                                              color="warning"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              Select
                                            </Button>
                                            <Button
                                              color="dark"
                                              type="button"
                                              className="waves-effect waves-light mr-1"
                                            >
                                              Group
                                            </Button>
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      {this.state.monitizeScratch.length - 1 ==
                                      index ? (
                                        <div className="button-items">
                                          <Button
                                            color="danger"
                                            type="button"
                                            className="waves-effect waves-light mr-1"
                                            onClick={() => {
                                              if (
                                                this.state.monitizeScratch
                                                  .length > 1
                                              ) {
                                                let indexx = this.state.monitizeScratch.indexOf(
                                                  item
                                                );
                                                if (indexx > -1) {
                                                  this.state.monitizeScratch.splice(
                                                    indexx,
                                                    1
                                                  );
                                                }
                                                this.setState({});
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
                                                index,
                                                "Scratch"
                                              );
                                              if (blank) {
                                                let option = this.dateChk(
                                                  index,
                                                  "Scratch"
                                                );

                                                if (option) {
                                                  this.state.monitizeScratch.push(
                                                    this.state
                                                      .monitizeScratchObj
                                                  );
                                                  this.setState({});
                                                } else {
                                                  alert("Invalid Expire Date");
                                                }
                                              } else {
                                                alert(
                                                  "Please Fill Up Required Details"
                                                );
                                              }
                                            }}
                                          >
                                            Add More{" "}
                                            <i className="ri-add-fill align-middle ml-1"></i>
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="button-items">
                                          <Button
                                            color="danger"
                                            type="button"
                                            className="waves-effect waves-light mr-1"
                                            onClick={() => {
                                              if (
                                                this.state.monitizeScratch
                                                  .length > 1
                                              ) {
                                                let indexx = this.state.monitizeScratch.indexOf(
                                                  item
                                                );
                                                if (indexx > -1) {
                                                  this.state.monitizeScratch.splice(
                                                    indexx,
                                                    1
                                                  );
                                                }
                                                this.setState({});
                                              }
                                            }}
                                          >
                                            <i className="ri-close-line align-middle mr-1"></i>{" "}
                                            Delete
                                          </Button>
                                        </div>
                                      )}
                                    </Col>
                                  </Row>
                                );
                              })}
                              <Row>
                                <Col lg="12">
                                  <FormGroup className="mb-0">
                                    <div className="button-items pt-4">
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={() => {
                                          this.submitFrom();
                                        }}
                                      >
                                        Live Now{" "}
                                        <i className="ri-arrow-right-line align-middle ml-1"></i>
                                      </Button>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                            {/* <h4>Your Scratch Cards</h4>
                            <MDBDataTable responsive bordered data={cardData} /> */}
                          </TabPane>
                        </TabContent>
                      </div>
                    </CardBody>
                  </Card>
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
                  <h4>Your Scratch Cards</h4>
                  <MDBDataTable responsive bordered data={cardData} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
