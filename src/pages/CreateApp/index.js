import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Tooltip,
  Label,
  Input,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./design.css";
import AddImageBox from "./addImageBox";
import AddTextBox from "./addTextBox";
import Preview from "../Component/preview";
import AddIconsBox from "./addIconsBox";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      col1: true,
      col2: false,
      showImageBox: false,
      showTextBox: false,
      showIconsBox: false,
      tooltipOpen: false,
      customIcon: true,
    };
  }
  t_col1 = () => {
    this.setState({
      col1: !this.state.col1,
      //   col2: false,
    });
  };
  t_col2 = () => {
    this.setState({
      col2: !this.state.col2,
      //   col1: false,
    });
  };
  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  callBackImage = (val) => {
    this.setState({
      showImageBox: val,
    });
  };
  callBackText = (val) => {
    this.setState({
      showTextBox: val,
    });
  };
  callBackIcons = (val) => {
    this.setState({
      showIconsBox: val,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xl={8}>
                <div>
                  <div>
                    <h3 className="title-editor py-1 text-center">
                      Create Your App{" "}
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
                        Customize your application with our advanced tools
                      </Tooltip>
                    </h3>
                  </div>
                  <Row>
                    <Col className="col-md-6 col-lg-6 col-xl-6">
                      <div className="actionBox">
                        <div className="d-flex flex-column justify-content-end h-100"></div>
                      </div>
                    </Col>
                    <Col className="col-md-6 col-lg-6 col-xl-6">
                      <div className="actionBox bg-soft-secondary">
                        <Card className="mb-0">
                          <p
                            className="text-dark mb-0"
                            onClick={this.t_col1}
                            style={{ cursor: "pointer" }}
                          >
                            <CardHeader id="gen-question-headingOne">
                              <h5 className="font-size-14 m-0">
                                <i
                                  className={
                                    this.state.col1
                                      ? "mdi mdi-chevron-up accor-arrow-icon"
                                      : "mdi mdi-chevron-right accor-arrow-icon"
                                  }
                                ></i>{" "}
                                Homepage
                              </h5>
                            </CardHeader>
                          </p>

                          <Collapse isOpen={this.state.col1}>
                            <CardBody className="p-2">
                              <div className="row no-gutters mb-1">
                                <div className="col-md-12 mb-2">
                                  <button
                                    type="button"
                                    className="btn-success btn-full-width py-2 customUploadBtn"
                                  >
                                    Upload Background Image
                                    <input
                                      type="file"
                                      className="upload_input"
                                    />
                                  </button>
                                </div>
                                <div className="col-md-6">
                                  <button
                                    type="button"
                                    className="btn-warning btn-full-width py-2"
                                    onClick={() => this.callBackImage(true)}
                                  >
                                    Add Images
                                  </button>
                                </div>
                                <div className="col-md-6">
                                  <button
                                    type="button"
                                    className="btn-danger btn-full-width py-2"
                                    onClick={() => this.callBackText(true)}
                                  >
                                    Add Texts
                                  </button>
                                </div>
                              </div>
                            </CardBody>
                          </Collapse>
                        </Card>
                        <Card className="mb-0">
                          <p
                            className="text-dark mb-0"
                            onClick={this.t_col2}
                            style={{ cursor: "pointer" }}
                          >
                            <CardHeader id="gen-question-headingTwo">
                              <h5 className="font-size-14 m-0">
                                <i
                                  className={
                                    this.state.col2
                                      ? "mdi mdi-chevron-up accor-arrow-icon"
                                      : "mdi mdi-chevron-right accor-arrow-icon"
                                  }
                                ></i>{" "}
                                Panel
                              </h5>
                            </CardHeader>
                          </p>
                          <Collapse isOpen={this.state.col2}>
                            <CardBody className="p-2">
                              <button
                                type="button"
                                className="btn-primary btn-full-width py-2"
                                onClick={() => this.callBackIcons(true)}
                              >
                                Add Your Icons
                              </button>
                            </CardBody>
                          </Collapse>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xl={4}>
                {/* app preview here */}
                <div>
                  <Preview />
                </div>
              </Col>
            </Row>
          </Container>
          {/* upload images modal */}
          {this.state.showImageBox ? (
            <AddImageBox
              showImageBox={true}
              callBackImage={this.callBackImage}
            />
          ) : null}
          {/* add texts modal */}
          {this.state.showTextBox ? (
            <AddTextBox showTextBox={true} callBackText={this.callBackText} />
          ) : null}
          {/* add icons modal */}
          {this.state.showIconsBox ? (
            <AddIconsBox
              showIconsBox={true}
              callBackIcons={this.callBackIcons}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
