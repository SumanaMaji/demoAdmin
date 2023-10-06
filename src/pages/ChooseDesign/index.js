import React, { Component } from "react";
import { Container, Row, Col, Tooltip, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import "./design.css";
import AddImageBox from "./addImageBox";
import AddTextBox from "./addTextBox";
import Switch from "react-switch";
import Preview from "../Component/preview";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mulTexts: false,
      customchk: false,
      showImageBox: false,
      showTextBox: false,
      tooltipOpen: false,
      
    };
  }
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
  render() {
    function Offsymbol(text) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          {" "}
          {text}
        </div>
      );
    }

    function OnSymbol(text) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          {" "}
          {text}
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xl={8}>
                <div>
                  <div>
                    <h3 className="title-editor py-1 text-center">
                      Choose Your design{" "}
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
                        Choose a template (combination of colors, images and
                        features, that you can change anytime) and a layout (the
                        way your menu is designed and displayed)
                      </Tooltip>
                    </h3>
                  </div>
                  <Row>
                    <Col className="col-md-6 col-lg-6 col-xl-6">
                      <div className="actionBox">
                        <div className="d-flex flex-column justify-content-end h-100">
                          <button
                            type="button"
                            className="btn-primary btn-full-width py-2 mb-1"
                          >
                            Choose Design
                          </button>
                          

                          <div className="row no-gutters mb-1">
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
                        </div>
                      </div>
                    </Col>
                    <Col className="col-md-6 col-lg-6 col-xl-6">
                      <div className="actionBox bg-soft-secondary">
                        <div className="border-0 card rounded-0 bg-white mb-0">
                          <div className="d-flex flex-row px-2 py-2">
                            <Switch
                              uncheckedIcon={Offsymbol("No")}
                              checkedIcon={OnSymbol("Yes")}
                              onColor="#626ed4"
                              onChange={() =>
                                this.setState({
                                  mulTexts: !this.state.mulTexts,
                                })
                              }
                              checked={this.state.mulTexts}
                              className="mr-1 mt-1"
                            />
                            <h5 className="ml-2 my-auto">Use Multiple Texts</h5>
                          </div>
                          <div className="d-flex flex-row px-2 py-2">
                            <Switch
                              uncheckedIcon={Offsymbol("No")}
                              checkedIcon={OnSymbol("Yes")}
                              onColor="#02a499"
                              onChange={() =>
                                this.setState({ bgImage: !this.state.bgImage })
                              }
                              checked={this.state.bgImage}
                              className="mr-1 mt-1"
                            />
                            <h5 className="ml-2 my-auto">
                              Use Background Images
                            </h5>
                          </div>
                          
                        </div>
                        
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
        </div>
      </React.Fragment>
    );
  }
}
