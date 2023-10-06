import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";

export default class addIconsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showIconsBox: this.props.showIconsBox ? this.props.showIconsBox : false,
      iconList: [
        { clName: "ri-mail-send-line" },
        { clName: "ri-share-line" },
        { clName: "ri-menu-2-line" },
        { clName: "ri-dashboard-line" },
        { clName: "ri-user-2-line" },
        { clName: "ri-settings-2-line" },
        { clName: "ri-lock-unlock-line" },
        { clName: "ri-notification-3-line" },
      ],
    };
  }
  closeModal = () => {
    this.props.callBackIcons(false);
    this.setState({ showIconsBox: false });
  };
  render() {
    return (
      <div
        className={this.state.showIconsBox ? "modal fade show" : "modal fade"}
        id="addIconModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addIconModalLabel"
        style={{ display: this.state.showIconsBox ? "block" : "none" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ marginTop: "5%", maxWidth: "700px" }}
        >
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="addIconModalLabel">
                Add your icons
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="form">
                    <h5 className="mb-3">
                      Enter the following details to add icons
                    </h5>
                    <div className="form-group d-flex">
                      <h6 className="mb-0 my-auto">Your Selected Icons : </h6>
                      <i className="ri-lock-unlock-line font-size-20 mx-1 my-auto"></i>
                      <i className="ri-mail-send-line font-size-20 mx-1 my-auto"></i>
                    </div>
                    <div className="form-group">
                      <Label for="icon_name">Icon Name</Label>
                      <Input
                        className="form-control"
                        type="text"
                        defaultValue=""
                        id="icon_name"
                        placeholder="Enter Icon Name..."
                      />
                    </div>
                    <div className="form-group">
                      <Label for="icon_url">Icon URL (Optional)</Label>
                      <Input
                        className="form-control"
                        type="text"
                        defaultValue=""
                        id="icon_url"
                        placeholder="Enter Icon URL (if any)..."
                      />
                    </div>
                    <Button
                      color="primary"
                      type="button"
                      className="waves-effect waves-light mr-1"
                    >
                      Submit{" "}
                      <i className="ri-arrow-right-line align-middle ml-1"></i>
                    </Button>

                    <Button
                      color="danger"
                      type="button"
                      className="waves-effect waves-light mr-1"
                    >
                      Delete <i className="ri-close-line align-middle ml-1"></i>
                    </Button>
                    <Button
                      color="secondary"
                      type="button"
                      className="waves-effect waves-light mr-1"
                    >
                      Add More <i className="ri-add-fill align-middle ml-1"></i>
                    </Button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border-0 card rounded-0 bg-white py-1 px-0 h-100">
                    <button
                      id="addIcon"
                      className="btn btn-sm btn-info customUploadBtn"
                    >
                      <i className="ri-add-fill mr-1" />
                      Add Icons
                      <input type="file" className="upload_input" />
                    </button>
                    <div className="d-flex flex-wrap w-100 icons_block justify-content-center relative pt-2">
                      {this.state.iconList.map((item, index) => {
                        return (
                          <div className="iconsItem" key={index}>
                            <div className="custom-control custom-checkbox mb-0">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={"CustomCheck" + index}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={"CustomCheck" + index}
                              >
                                <i className={`grav_icon ${item.clName}`} />
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
