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
import HttpClient from "./../../utils/HttpClient";
class FormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Icon Library", link: "#" },
        { title: "Add & Manage Icon Library", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      // page states
      name: "",
      desc: "",
      duration: "",
      price: "",
      data: [],
      alert: false,
      message: "",
      type: "",
      result: [],
      edit_enable: false,
      edit_item_id: "",
      image_select: false,
      img_url: "",
      category_type: "",
      category: [],
      cat_id: "",
    };
  }

  componentDidMount = async () => {
    this.fetchData();
    this.fetchCategory();
  };

  fetchCategory = async () => {
    let result = await HttpClient.requestData("admin/icon/category", "GET");
    if (result && result.status > 0) {
      this.setState({ category: result.data });
    }
  };
  fetchData = async () => {
    let result = await HttpClient.requestData("admin/icon", "GET");
    if (result && result.status > 0) {
      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          name: element.iconData?element.iconData.name:"",
          img: (
            <div>
              <img
                src={element.img}
                alt="images"
                className="rounded avatar-md card-img"
              />
            </div>
          ),
          action: (
            <>
              <button
                title="Delete"
                className="btn btn-danger mr-2"
                onClick={() => {
                  this.delete(element, index);
                }}
              >
                <i className="fa fa-trash" />
              </button>
              <button
                title="Edit"
                className="btn btn-primary"
                onClick={() => {
                  this.edit(element, index);
                }}
              >
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
  delete = async (item, index) => {
    let sendData = {
      id: item._id,
    };
    let result = await HttpClient.requestData(
      "admin/icon/delete",
      "POST",
      sendData
    );
    if (result && result.status) {
      let index = this.state.result.indexOf(item);
      if (index > -1) {
        this.state.result.splice(index, 1);
        this.setState({
          alert: true,
          message: "Deleted Successfully",
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
      cat_id: item.cat_id,
      edit_item_id: item._id,
      img_url: item.img,
      image_select: true,
    });
  };
  submit = async () => {
    if (this.state.img_url != "" && this.state.cat_id != "") {
      let data = null;
      let result = null;

      if (this.state.edit_enable == false) {
        data = {
          cat_id: Number(this.state.cat_id),
          img: this.state.img_url,
        };
        result = await HttpClient.requestData("admin/icon", "POST", data);
      } else {
        data = {
          name: this.state.name,
          cat_id: Number(this.state.cat_id),
          img: this.state.img_url,
          id: this.state.edit_item_id,
        };
        result = await HttpClient.requestData(
          "admin/icon/update",
          "POST",
          data
        );
      }
    //   console.log("result", result);
      if (result && result.status) {
        this.setState({
          alert: true,
          message: this.state.edit_enable
            ? "Icon Updated Successfully"
            : "Icon Added Successfully",
          type: "success",
          name: "",
          img_url: "",
          category_type: "",
          image_select: false,
          edit_enable: false,
          edit_item_id: "",
          desc: "",
        });

        this.fetchData();
      } else {
        this.setState({
          alert: true,
          message: result.error,
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

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ cat_id: event.target.value });
  };

  imageUpload = async (e) => {
    // console.log("e", e.target.files);
    let file = e.target.files;
    //   if(file.lenght>0)
    //   {
    let dataSend = { buckate: true, buckate_name: "appIcon" };

    let result = await HttpClient.newFileUpload(
      "image-upload/icon",
      e.target.files[0],
      dataSend
    );
    // console.log("result", result);
    if (result && result.status) {
      this.setState({ img_url: result.url, image_select: true });
    }

    //   }
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
          label: "Category",
          field: "name",
          sort: "asc",
          width: 270,
        },
        {
          label: "Image",
          field: "img",
          sort: "asc",
          width: 270,
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
            <Breadcrumbs
              title={this.state.breadcrumbItems[0].title}
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
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
                        Icon Category
                      </Label>
                      <Col md={10}>
                        <select
                          className="form-control"
                          onChange={this.handleChange}
                          value={this.state.cat_id}
                        >
                          <option value="">Select Category</option>
                          {this.state.category.map((item, index) => {
                            return (
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Image
                      </Label>
                      <Col md={4}>
                        <Button
                          color="danger"
                          type="button"
                          className="waves-effect waves-light customUploadBtn mr-1"
                        >
                          <i className="ri-add-fill align-middle mr-1"></i> Add
                          image
                          <input
                            type="file"
                            className="upload_input"
                            onChange={(e) => {
                              this.imageUpload(e);
                            }}
                          />
                        </Button>
                      </Col>
                      {this.state.image_select ? (
                        <Col md={4}>
                          <div>
                            <img
                              src={this.state.img_url}
                              alt="images"
                              className="rounded avatar-md card-img"
                            />
                          </div>
                        </Col>
                      ) : null}
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

export default FormElements;
