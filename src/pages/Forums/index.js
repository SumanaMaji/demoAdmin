import React, { Component } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { UncontrolledAlert, Row, Col } from "reactstrap";
import moment from "moment";
import HttpClient from "./../../utils/HttpClient";
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showIdeaModal: false,
      loop: [1, 2, 3, 4, 5],
      loop2: [1, 2, 3],
      userId: "",
      userDetails: {},
      name: "",
      email: "",
      subject: "",
      messge: "",
      allData: [],
    };
  }
  componentDidMount = () => {
    this.checkUser();
  };

  submit = async () => {
    if (
      this.state.messge != "" &&
      this.state.name != "" &&
      this.state.email != "" &&
      this.state.subject != ""
    ) {
      let sendData = {
        owner_id: this.state.userId,
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.messge,
      };
      let result = await HttpClient.requestData(
        "app-owner/fourm",
        "POST",
        sendData
      );
      console.log("fetchActivePlans", result);
      if (result && result.status) {
        this.fetchPlans();
        this.setState({
          alert: true,
          message: "Message Submited Successfully",
          type: "success",
          subject:'',
          messge:'',
          
        });

        setTimeout(()=>{
          this.setState({showIdeaModal:false})
        },3000)
      } else {
        this.setState({
          alert: true,
          message:
            typeof result.error == "string"
              ? result.error
              : result.error[0].msg,
          type: "danger",
        });
      }
    }
    else
    {
      this.setState({
        alert: true,
        message: "Please Fillup Details",
        type: "warning",
        
      });
    }

    setTimeout(() => {
      this.setState({
        alert: false,
        message: "",
        type: "",
        

      });
    }, 3000);
  };

  checkUser = async () => {
    let user = await reactLocalStorage.getObject("userData");
    if (user != null && Object.keys(user).length > 0) {
      this.setState({
        userId: user.id,
        userDetails: user,
        name: user.name,
        email: user.email,
      });
    } else {
    }
    this.fetchPlans();
  };

  fetchPlans = async () => {
    let result = await HttpClient.requestData("app-owner/fourm", "GET");
    if (result && result.status) {
      this.setState({ allData: result.data });
    } else {
    }
  };
  

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="bg-white p-3 rounded">
                  <div className="d-flex mb-3">
                    <h4 className="font-size-18 my-auto">Our Forums Panel</h4>
                    {/* <button
                      type="button"
                      className="my-auto ml-auto mr-2 btn btn-primary"
                      onClick={() => this.setState({ showIdeaModal: true })}
                    >
                      Add Your Idea{" "}
                      <i className="ri-add-fill align-middle ml-1"></i>
                    </button> */}
                  </div>
                  {this.state.allData.map((item, index) => {
                    return (
                      <div className="mb-4 media pb-3 shadow-sm" key={index}>
                        <img
                          className="avatar-sm mr-3 rounded-circle"
                          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                          alt="img"
                        />
                        <div className="media-body">
                          <h4 className="mt-0 font-size-14">
                            {item.ownerData?item.ownerData.name:''},{item.ownerData?item.ownerData.email:''}
                          </h4>
                          <h5 className="mt-0 font-size-14">
                            {item.subject?item.subject:''}
                            <span className="pull-right">{moment(item.created_on).format('L')}</span>
                          </h5>
                          {item.message?item.message:''}
                          <div className="pull-right mt-2">
                            <button className="btn btn-light px-2 py-0 font-size-18">
                              5
                              <i className="mdi mdi-chevron-up font-size-20 pl-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-white p-2 rounded mb-4">
                  <h4 className="font-size-18 mb-3">Top Rated This Month</h4>
                  {[].map((item, index) => {
                    return (
                      <div className="mb-3 media pb-3 shadow-sm" key={index}>
                        <img
                          className="avatar-sm mr-3 rounded-circle"
                          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                          alt="img"
                        />
                        <div className="media-body">
                          <h5 className="mt-0 font-size-14">
                            User heading 2
                            <span className="pull-right">26 jan, 21</span>
                          </h5>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Nemo culpa veniam eum facilis,
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white p-2 rounded mb-4">
                  <h4 className="font-size-18 mb-3">What's Coming New</h4>
                  {[].map((item, index) => {
                    return (
                      <div className="mb-3 media pb-3 shadow-sm" key={index}>
                        <img
                          className="avatar-sm mr-3 rounded-circle"
                          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                          alt="img"
                        />
                        <div className="media-body">
                          <h5 className="mt-0 font-size-14">
                            User heading 2
                            <span className="pull-right">26 jan, 21</span>
                          </h5>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Nemo culpa veniam eum facilis,
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* add idea modal */}
            <div
              className={
                this.state.showIdeaModal ? "modal fade show" : "modal fade"
              }
              id="addIdeaModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="addIdeaModalLabel"
              style={{ display: this.state.showIdeaModal ? "block" : "none" }}
            >
              
              <div
                className="modal-dialog"
                role="document"
                style={{ marginTop: "7%" }}
              >
                <div className="modal-content">
                  <div className="modal-header bg-light">
                    <h5 className="modal-title" id="addIdeaModalLabel">
                      Your feedback matters
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => this.setState({ showIdeaModal: false })}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <Row>
                <Col lg={12}>
                  {this.state.alert ? (
                    <UncontrolledAlert
                      color={this.state.type}
                      className="alert-dismissible fade show"
                      role="alert"
                    >
                      {this.state.type == "warning" ? (
                        <i className="mdi mdi-alert-outline mr-2"></i>
                      ) : this.state.type == "success" ? (
                        <i className="mdi mdi-check-all mr-2"></i>
                      ) : this.state.type == "danger" ? (
                        <i className="mdi mdi-block-helper mr-2"></i>
                      ) : null}
                      {this.state.message}
                    </UncontrolledAlert>
                  ) : null}
                </Col>
              </Row>
                  <div className="modal-body">
                    <div className="row mb-3">
                      <div className="col-md-6 col-12">
                        <input
                          type="text"
                          name="name"
                          size={40}
                          className="form-control"
                          placeholder="Enter your name"
                          onChange={(val) => {
                            this.setState({ name: val.target.value });
                          }}
                          value={this.state.name}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <input
                          type="email"
                          name="your-email"
                          size={40}
                          className="form-control"
                          placeholder="E-mail address"
                          onChange={(val) => {
                            this.setState({ email: val.target.value });
                          }}
                          value={this.state.email}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-12 mb-3">
                        <input
                          type="text"
                          name="your-subject"
                          size={40}
                          className="form-control"
                          aria-invalid="false"
                          placeholder="Subject"
                          onChange={(val) => {
                            this.setState({ subject: val.target.value });
                          }}
                          value={this.state.subject}
                        />
                      </div>
                      <div className="col-md-12 col-12">
                        <textarea
                          name="your-message"
                          rows={3}
                          className="form-control"
                          aria-required="true"
                          aria-invalid="false"
                          placeholder="Your message"
                          onChange={(val) => {
                            this.setState({ messge: val.target.value });
                          }}
                          value={this.state.messge}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {this.setState({showIdeaModal:!this.state.showIdeaModal})}}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => this.submit()}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
