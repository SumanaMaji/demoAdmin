import React, { Component } from "react";

export default class addTextBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTextBox: this.props.showTextBox ? this.props.showTextBox : false,
    };
  }
  closeModal = () => {
    this.props.callBackText(false);
    this.setState({ showTextBox: false });
  };
  render() {
    return (
      <div
        className={this.state.showTextBox ? "modal fade show" : "modal fade"}
        id="addImageModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addImageModalLabel"
        style={{ display: this.state.showTextBox ? "block" : "none" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ marginTop: "5%" }}
        >
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="addTextModalLabel">
                Add Texts
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
              <div className="upload_text_area">
                <form action="#" method="POST" className="form">
                  <textarea
                    rows={4}
                    className="form-control mb-3"
                    placeholder="Enter your texts here"
                    defaultValue={""}
                  />
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
