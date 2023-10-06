import React, { Component } from "react";
import "./preview.css";

export default class preview extends Component {
  render() {
    return (
      <div id="chr_phone" className>
        <div className="text-center mb-3" role="group">
          <button id="previewer" className="btn btn-sm btn-primary mr-3">
            <i className="fa fa-mobile-phone mr-1" />
            Preview on phone
          </button>
          <button id="reload-overview" className="btn btn-sm btn-danger">
            <i className="fa fa-refresh mr-1" />
            <span>See changes</span>
          </button>
        </div>
        <div className="chr_phone_content">
          <img
            id="mobile_overview"
            sandbox="allow-popups allow-same-origin allow-scripts allow-forms allow-modals allow-presentation"
            src="https://play-lh.googleusercontent.com/Z7YjoHxiMDngTidMtr3bx5OPjpmSpXZPBVAqHZkPQ85qd-LWY0XMdzR5Jd8WJcde1Tkv=w1366-h657-rw"
          />
          <div id="phone-bar" className="pt-1">
            <span className="pull-left" style={{ fontWeight: 600 }}>
              05:37
            </span>
            <span className="pull-right">
              <i className="fa fa-wifi" />
              <i className="fa fa-signal ml-1" />
              <i className="fa fa-battery-full ml-1" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
