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
  Button,
  UncontrolledAlert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";
import HttpClient from "../../utils/HttpClient";
import validator from 'validator';

class FormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Patient Management", link: "#" },
        { title: "Add & Manage Patient List", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      // page states
      name: "",
     ssn:"",
     address:"",
     phone:"",
     pcp:"",
      result: [],
      edit_enable: false,
      edit_item_id: "",
      data: [],
      alert: false,
      message: "",
      type: "",
      modal_standard: false,
      modal_standard_view: false,
      activeModal: null,
      activeModalView: null,
      deleteLoading: false,
    };
    this.tog_standard = this.tog_standard.bind(this);
    this.toggle_standard = this.toggle_standard.bind(this);
  }
  tog_standard() {
    this.setState((prevState) => ({
      modal_standard: !prevState.modal_standard,
    }));
    this.removeBodyCss();
  }
  toggle_standard() {
    this.setState((prevState) => ({
      modal_standard_view: !prevState.modal_standard_view,
    }));
    this.removeBodyCss();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  componentDidMount = async () => {
    let resultCat = await HttpClient.requestData("admin/patient", "GET");

    if (resultCat && resultCat.status) {
      this.setState({ patient_all: resultCat.data });
    }
    this.fetchData();
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ patient_id: event.target.value });
  };
  deleteModal = (data, index) => {
    this.setState({ modal_standard: true, activeModal: data });
  };
  viewModal = (data, index) => {
    this.setState({ modal_standard_view: true, activeModalView: data });
  };
  fetchData = async () => {
    let result = await HttpClient.requestData("admin/patient", "GET");
   
    if (result && result.status) {
      let data = [];
      let i = 1;
      this.setState({ result: result.data });
      this.state.result.forEach((element, index) => {
        let rows = {
          sl: i,
          name: element.name,
          ssn: element.ssn,
          address: element.address,
          phone: element.phone,
          pcp: element.pcp,
          action: (
            <>
              <button
                title="Delete"
                className="btn btn-danger mr-2"
                onClick={() => {
                  this.deleteModal(element, index);
                }}
              >
                <i className="fa fa-trash" />
              </button>
              <button
                title="Edit"
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.edit(element, index);
                }}
              >
                <i className="fa fa-edit" />
              </button>
              <button
                title="View"
                className="btn btn-info mr-2"
                onClick={() => {
                  this.viewModal(element, index);
                }}
              >
                <i className="fa fa-eye" />
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
    this.setState({ deleteLoading: true });
    // return false
    // let sendData = {
    //   id: item._id,
    // };
    let result = await HttpClient.requestData(
      "admin/patient/" + this.state.activeModal._id,
      "DELETE"
    );
    if (result && result.status) {
      let index = this.state.result.indexOf(this.state.activeModal);
      if (index > -1) {
        this.state.result.splice(index, 1);
        this.setState({
          alert: true,
          message: "Deleted Successfully",
          type: "success",
          deleteLoading: false,
          activeModal: null,
          modal_standard: false,
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
  view = async (item, index) => {
    this.setState({ deleteLoading: true });
  
    let result = await HttpClient.requestData(
      "admin/patient-details/" + this.state.activeModalView._id,
      "GET"
    );
    if (result && result.status) {
      let index = this.state.result.indexOf(this.state.activeModalView);
      if (index > -1) {
        this.state.result.splice(index, 1);
        this.setState({
          alert: true,
          message: "Deleted Successfully",
          type: "success",
          deleteLoading: false,
          activeModalView: null,
          modal_standard_view: false,
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
      ssn: item.ssn,
      address: item.address,
      phone: item.phone,
      pcp: item.pcp,
      edit_item_id: item._id,
    });
  };
  submit = async () => {
  
    if (this.state.name != "" && this.state.address != "" && this.state.ssn != "" && this.state.pcp != "" && this.state.phone != "") {
      let data = null;
      let result = null;

      const isValidPhoneNumber = validator.isMobilePhone(this.state.phone);
      console.log("phone"+isValidPhoneNumber);
      if(isValidPhoneNumber == false){
        this.setState({
          alert: true,
          message: "Phone number invalid.",
          type: "danger",
        });
      }
      else{
        if (this.state.edit_enable == false) {
          data = { name: this.state.name, address: this.state.address, ssn: this.state.ssn, phone: this.state.phone, pcp: this.state.pcp};
      
          result = await HttpClient.requestData("admin/patient","POST",data);
          console.log("res--->>"+ JSON.stringify(data)+ JSON.stringify(result));            
        }
        else{
          data = { name: this.state.name, address: this.state.address, ssn: this.state.ssn, phone: this.state.phone, pcp: this.state.pcp};
          result = await HttpClient.requestData(
            "admin/patient/"+ this.state.edit_item_id,
            "PUT",
            data
          );
        }
        if (result && result.status) {
          console.log(JSON.stringify(result));
          this.setState({
            alert: true,
            message: this.state.edit_enable
              ? "List Updated Successfully"
              : "List Added Succfully",
            type: "success",
            name: "",
            address: "",
            ssn: "",
            phone: "",
            pcp:"",
            edit_enable: false,
            edit_item_id: "",
          });
          this.fetchData();
        } else {
          this.setState({
            alert: true,
            message: "Items Exists",
            type: "danger",
          });
        }
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
          label: "Patient Name",
          field: "name",
          sort: "asc",
          width: 270,
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
          width: 270,
        },
        {
          label: "Phone",
          field: "phone",
          sort: "asc",
          width: 270,
        },
        {
          label: "SSN",
          field: "ssn",
          sort: "asc",
          width: 270,
        },
        {
          label: "Physican",
          field: "pcp",
          sort: "asc",
          width: 270,
        },
        {
          label: "ACTION",
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
             {/* start of modal */}
             <Modal
              isOpen={this.state.modal_standard}
              toggle={this.tog_standard}
            >
              <ModalHeader
                toggle={() => this.setState({ modal_standard: false })}
              >
                Are you sure you want to delete{" "}
                {this.state.activeModal != null && this.state.activeModal.name}{" "}
                ?
              </ModalHeader>
              <ModalBody>
                <h5>
                  Name -{" "}
                  {this.state.activeModal != null &&
                    this.state.activeModal.name}
                </h5>
                <p>
                  If you want to delete click on Delete Now otherwize click on
                  close.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={this.tog_standard}
                  color="light"
                  className="waves-effect"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="waves-effect waves-light"
                  onClick={() => {
                    this.delete();
                  }}
                >
                  {this.state.deleteLoading ? (
                    <Spinner size="sm" color="secondary" />
                  ) : (
                    "Delete Now"
                  )}
                </Button>
              </ModalFooter>
            </Modal>
            {/* end of modal */}
              {/* start view of modal */}
              <Modal
              isOpen={this.state.modal_standard_view}
              toggle={this.toggle_standard}
            >
              <ModalHeader
                toggle={() => this.setState({ modal_standard_view: false })}
              >
                {this.state.activeModalView != null && this.state.activeModalView.name}{" "}
              </ModalHeader>
              <ModalBody>
                <h5>
                Patient Name -{" "}
                  {this.state.activeModalView != null &&
                    this.state.activeModalView.name}
                </h5>
                <h5>
                Address -{" "}
                  {this.state.activeModalView != null &&
                    this.state.activeModalView.address}
                </h5>
                <h5>
                Phone -{" "}
                  {this.state.activeModalView != null &&
                    this.state.activeModalView.phone}
                </h5>
                <h5>
                SSN -{" "}
                  {this.state.activeModalView != null &&
                    this.state.activeModalView.ssn}
                </h5>
                <h5>
                PCP -{" "}
                  {this.state.activeModalView != null &&
                    this.state.activeModalView.pcp}
                </h5>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={this.toggle_standard}
                  color="light"
                  className="waves-effect"
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>
            {/* end of modal */}
            <Breadcrumbs
              title={this.state.breadcrumbItems[1].title}
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
                        Patient Name:
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
                       Address:
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.address}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ address: val.target.value });
                          }}                       
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        SSN:
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.ssn}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ ssn: val.target.value });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                      Phone Number:
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text" 
                          value={this.state.phone}
                          id="example-text-input"
                          // onChange={(val) => {
                          //   this.setState({ phone: val.target.value });
                          // }}
                          onChange={(val) => {
                          this.setState({ phone: val.target.value });
                          }}
                          required
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                      PCP:
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          value={this.state.pcp}
                          id="example-text-input"
                          onChange={(val) => {
                            this.setState({ pcp: val.target.value });
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
