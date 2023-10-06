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

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      tooltipOpen: false,
      monthDate: new Date(),
    };
    this.toggleTab.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }
  handleMonthChange(date) {
    this.setState({ monthDate: date });
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
                      Your communication{" "}
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
                        Create Your inspiration & notification
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
                              <span className="step-title">
                                Create inspiration
                              </span>
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
                              <span className="step-title">
                                Create notification
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === 3,
                              })}
                              onClick={() => {
                                this.toggleTab(3);
                              }}
                            >
                              <span className="step-number">03</span>
                              <span className="step-title">Confirm</span>
                            </NavLink>
                          </NavItem>
                        </ul>
                        <TabContent
                          activeTab={this.state.activeTab}
                          className="twitter-bs-wizard-tab-content"
                        >
                          <TabPane tabId={1}>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <Label for="basicpill-address-input1">
                                      Describe Message
                                    </Label>
                                    <textarea
                                      id="basicpill-address-input1"
                                      className="form-control"
                                      rows="5"
                                      placeholder="Enter your message here..."
                                    ></textarea>
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup className="mb-1">
                                    <Label>Shedule Date</Label>
                                    <InputGroup>
                                      <DatePicker
                                        selected={this.state.monthDate}
                                        className="form-control"
                                        onChange={this.handleMonthChange}
                                        showMonthDropdown
                                      />
                                    </InputGroup>
                                    <Label className="pt-3">
                                      Whom you want to share
                                    </Label>
                                    <FormGroup className="mb-0">
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
                                    </FormGroup>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup className="mb-4">
                                    <div className="button-items">
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                      >
                                        Live Now{" "}
                                        <i className="ri-arrow-right-line align-middle ml-2"></i>
                                      </Button>

                                      <Button
                                        color="danger"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                      >
                                        <i className="ri-close-line align-middle mr-2"></i>{" "}
                                        Delete
                                      </Button>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <Label for="basicpill-address-input1">
                                      Describe Notification
                                    </Label>
                                    <textarea
                                      id="basicpill-address-input1"
                                      className="form-control"
                                      rows="5"
                                      placeholder="Enter your notification here..."
                                    ></textarea>
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup className="mb-1">
                                    <Label>Shedule Notification</Label>
                                    <InputGroup>
                                      <DatePicker
                                        selected={this.state.monthDate}
                                        className="form-control"
                                        onChange={this.handleMonthChange}
                                        showMonthDropdown
                                      />
                                    </InputGroup>
                                    <Label className="pt-3">
                                      Whom you want to share
                                    </Label>
                                    <FormGroup className="mb-0">
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
                                    </FormGroup>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup className="mb-4">
                                    <div className="button-items">
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                      >
                                        Live Now{" "}
                                        <i className="ri-arrow-right-line align-middle ml-2"></i>
                                      </Button>

                                      <Button
                                        color="danger"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                      >
                                        <i className="ri-close-line align-middle mr-2"></i>{" "}
                                        Delete
                                      </Button>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </TabPane>

                          <TabPane tabId={3}>
                            <div className="row justify-content-center">
                              <Col lg="6">
                                <div className="text-center">
                                  <div className="mb-4">
                                    <i className="mdi mdi-check-circle-outline text-success display-4"></i>
                                  </div>
                                  <div>
                                    <h5>Confirmed</h5>
                                    <p className="text-muted">
                                      Lorem ipsum dolor sit amet consiquetive
                                      nessir ayis ipsum dolor
                                    </p>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </TabPane>
                        </TabContent>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                          <li
                            className={
                              this.state.activeTab === 1
                                ? "previous disabled"
                                : "previous"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                this.toggleTab(this.state.activeTab - 1);
                              }}
                            >
                              Previous
                            </Link>
                          </li>
                          <li
                            className={
                              this.state.activeTab === 3
                                ? "next disabled"
                                : "next"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                this.toggleTab(this.state.activeTab + 1);
                              }}
                            >
                              Next
                            </Link>
                          </li>
                        </ul>
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
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
