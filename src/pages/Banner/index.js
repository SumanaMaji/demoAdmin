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
        { title: "Banner", link: "#" },
        { title: "Add & Manage Banner", link: "#" },
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
      seletedFile: null,
    };
  }

  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    let result = await HttpClient.requestData("banner", "GET");
    // console.log("result", result);
    if (result && result.success) {
      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          name: element.title,
          img: (
            <div>
              <img
                src={element.image}
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
      "banner/"+item._id,
      "DELETE"
    );
    if (result && result.success) {
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
      name: item.title,
      edit_item_id: item._id,
      img_url: item.image,
      image_select: true,
      desc:item.description
    });
  };

  submit = async () => {
    if (
      this.state.name != "" &&
      this.state.img_url != "" &&
      this.state.image_select
    ) {
      let data = null;
      let result = null;

      if (this.state.edit_enable == false) {
        data = new FormData();
        data.append("description", this.state.desc);
        data.append('title',this.state.name);
        data.append("image",this.state.seletedFile);
        result = await HttpClient.requestFile("banner", "POST", data);
      } else {
        data = new FormData();
        data.append("description", this.state.desc);
        data.append('title',this.state.name);
        if(this.state.seletedFile !=null)
        {
          data.append("image",this.state.seletedFile);
        }
        result = await HttpClient.requestFile(
          "banner/"+this.state.edit_item_id,
          "PUT",
          data
        );
      }
      if (result && result.success) {
        this.setState({
          alert: true,
          message: this.state.edit_enable
            ? "Banner Updated Successfully"
            : "Banner Added Succfully",
          type: "success",
          name: "",
          img_url: "",
          image_select: false,
          edit_enable: false,
          edit_item_id: "",
          desc: "",
          seletedFile:null
        });
        this.fetchData();
      } else {
        this.setState({
          alert: true,
          message: "Category Exists",
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
    this.setState({ category_type: event.target.value });
  };

  imageUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // console.log("e", e.target.files[0]);
      let file = e.target.files[0];
      let preview = URL.createObjectURL(file);
      this.setState({
        image_select: true,
        img_url: preview,
        seletedFile: file,
      });
    } else {
      this.setState({
        image_select: false,
        img_url: "",
      });
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
          label: "Name",
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
                        Title
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
                        Description
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="textarea"
                          value={this.state.desc}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ desc: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Image
                      </Label>
                      <Col md={6}>
                        <Input
                          className="form-control"
                          type="file"
                          id="example-text-input"
                          onChange={this.imageUpload}
                        />
                      </Col>
                      <Col md={4}>
                        {this.state.image_select ? (
                          <div>
                            <img
                              style={{ height: 200, width: 200 }}
                              src={this.state.img_url}
                              alt="images"
                              className="rounded avatar-md card-img"
                            />
                          </div>
                        ) : null}
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
