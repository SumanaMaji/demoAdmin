import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
  UncontrolledAlert,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import HttpClient from "../../utils/HttpClient";
class FormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Donee", link: "#" },
        { title: "Manage Donee", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      // page states
      name: "",
      email: "",
      mobile: "",
      password: "",
      data: [],
      alert: false,
      message: "",
      type: "",
      result: [],
      edit_enable: false,
      edit_item_id: "",
    };
  }

  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    let result = await HttpClient.requestData("request", "GET");
    if (result && result.success) {
      console.log("result", result);

      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          //   image:(
          //     <div>
          //       <img
          //         src={element.image}
          //         alt="images"
          //         className="rounded avatar-md card-img"
          //       />
          //     </div>
          //   ),
          name: <div>
          <p style={{fontWeight:'bold'}}>{element.anonymousName}</p>
          <p>Address: {element.address}</p>
          <p>
            City: {element.city}, State: {element.state}
          </p>
          <p>Pincode: {element.postalCode}</p>
        </div>,
          desc: element.description,
          cat: (
            <div>
              <span>
                {element.categorieData
                  ? element.categorieData.category_name
                  : ""}
                (
                <span style={{ color: "red" }}>
                  {" "}
                  {element.subCategorieData
                    ? element.subCategorieData.subCategoryName
                    : ""}{" "}
                </span>
                )
              </span>
            </div>
          ),
          address: (
            <div>
              <p>Address: {element.address}</p>
              <p>
                City: {element.city}, State: {element.state}
              </p>
              <p>Pincode: {element.postalCode}</p>
            </div>
          ),
          report: (
            <div>
              <p>Report: {element.reports.length}</p>
              <p>Like: {element.reacts.filter((item)=>item.isLike == true).length}</p>
              <p>Dislike: {element.reacts.filter((item)=>item.isLike == true).length}</p>
            </div>
          ),
          view_report:(<div>
            <ul style={{paddingLeft:12}}>
              {element.reports.map((itemm)=>{
                return(<li>{itemm.description}</li>)
              })}
            </ul>
          </div>),
          created: moment.unix(Number(element.createOn) / 1000).format("LLL"),
          status: (
            <button
              title="Delete"
              className={
                element.status ? "btn btn-success mr-2" : "btn btn-danger mr-2"
              }
              onClick={() => {
                this.status(element, index);
              }}
            >
              {element.status ? "Active" : "Not Active"}
            </button>
          ),
          action: (
            <>
              <button
                title="Delete"
                className="btn btn-danger mr-2"
                onClick={() => {
                  // this.delete(element, index);
                }}
              >
                <i className="fa fa-trash" />
              </button>
              {/* <button
                title="Edit"
                className="btn btn-primary"
                onClick={() => {
                  this.edit(element, index);
                }}
              >
                <i className="fa fa-edit" />
              </button> */}
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
  delete = async (item, index) => {
    let sendData = {
      id: item._id,
    };
    let result = await HttpClient.requestData(
      "admin/app-owner/delete",
      "POST",
      sendData
    );
    if (result && result.status) {
      let index = this.state.result.indexOf(item);
      if (index > -1) {
        this.state.result.splice(index, 1);
        this.setState({
          alert: true,
          message: "Deleted Succfully",
          type: "success",
        });
        setTimeout(() => {
          this.setState({
            alert: false,
            message: "",
            type: "",
          });
        }, 3000);
        this.fetchData();
      }
    }
  };
  edit = async (item, index) => {
    this.setState({
      edit_enable: true,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      password: "",
      edit_item_id: item._id,
    });
  };
  status = async (item, index) => {
    let sendData = {
      status: !item.status,
    };
    let result = await HttpClient.requestData(
      "request/"+item._id,
      "PUT",
      sendData
    );
    if (result && result.status) {
      this.setState({
        alert: true,
        message: "Status Updated Successfully",
        type: "success",
      });
      setTimeout(() => {
        this.setState({
          alert: false,
          message: "",
          type: "",
        });
      }, 3000);
      this.fetchData();
    }
  };
  submit = async () => {
    if (this.state.edit_enable) {
    } else {
      if (this.state.password != "") {
      } else {
        this.setState({
          alert: true,
          message: "Please Enter Password",
          type: "warning",
        });
        return;
      }
    }

    if (
      this.state.name != "" &&
      this.state.email != "" &&
      this.state.mobile != ""
    ) {
      let data = null;
      let result = null;

      if (this.state.edit_enable == false) {
        data = {
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          password: this.state.password,
        };
        result = await HttpClient.requestData("admin/app-owner", "POST", data);
      } else {
        data = {
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          password: this.state.password,
          id: this.state.edit_item_id,
        };
        result = await HttpClient.requestData(
          "admin/app-owner/update",
          "POST",
          data
        );
      }
      console.log("result", result);
      if (result && result.status) {
        this.setState({
          alert: true,
          message: this.state.edit_enable
            ? "User Updated Successfully"
            : "User Added Succfully",
          type: "success",
          name: "",
          email: "",
          mobile: "",
          password: "",
          edit_enable: false,
          edit_item_id: "",
        });

        this.fetchData();
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
    } else {
      this.setState({
        alert: true,
        message: "Please Fill Up All Details.",
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
          label: "User Details",
          field: "name",
          sort: "asc",
          width: 270,
        },
        {
          label: "Category",
          field: "cat",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "Address",
        //   field: "address",
        //   sort: "asc",
        //   width: 150,
        // },
        {
          label: "Desc",
          field: "desc",
          sort: "asc",
          width: 270,
        },
        {
          label: "Ststs",
          field: "report",
          sort: "asc",
          width: 150,
        },
        {
          label: "Reports",
          field: "view_report",
          sort: "asc",
          width: 150,
        },
        
        {
          label: "Created On",
          field: "created",
          sort: "asc",
          width: 150,
        },

        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 100,
        },
        // {
        //   label: "Action",
        //   field: "action",
        //   sort: "asc",
        //   width: 100,
        // },
      ],
      rows: this.state.data,
    };
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title={this.state.breadcrumbItems[0].title}
              breadcrumbItems={this.state.breadcrumbItems}
            />

            {/* <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
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
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.name}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ name: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Email
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.email}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ email: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Mobile
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.mobile}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ mobile: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Password
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.password}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ password: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div className="button-items pt-4">
                        <Button
                          color="primary"
                          type="button"
                          className="waves-effect waves-light mr-1"
                          onClick={() => {
                            this.submit();
                          }}
                        >
                          {this.state.edit_enable ? "Update" : "Submit"}{" "}
                          <i className="ri-arrow-right-line align-middle ml-1"></i>
                        </Button>
                      </div>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
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

export default FormElements;
