import React, { Component } from "react";

export default class addImageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showImageBox: this.props.showImageBox ? this.props.showImageBox : false,
    };
  }
  closeModal = () => {
    this.props.callBackImage(false);
    this.setState({ showImageBox: false });
  };
  render() {
    return (
      <div
        className={this.state.showImageBox ? "modal fade show" : "modal fade"}
        id="addImageModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addImageModalLabel"
        style={{ display: this.state.showImageBox ? "block" : "none" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ marginTop: "5%" }}
        >
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="addImageModalLabel">
                Upload your images
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
              <div className="upload_image_area">
                <form action="#" method="POST" className="load_form">
                  <input type="file" multiple />
                  <p>Drag your files here or click in this area.</p>
                  <button type="submit">Upload</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
