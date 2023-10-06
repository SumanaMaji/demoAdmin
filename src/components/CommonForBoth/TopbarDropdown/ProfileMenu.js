import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import { reactLocalStorage } from "reactjs-localstorage";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  render() {
    let username = "Admin";
    let profileImg =
      "https://oneanddone.fra1.digitaloceanspaces.com/user/user.png";
    let user = JSON.parse(window.sessionStorage.getItem("adminData"));
    if (user != null && Object.keys(user).length > 0) {
      const uNm = user.email.split("@")[0];
      username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
      //   profileImg = user.image;
    } else {
    }
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block user-dropdown"
        >
          <DropdownToggle
            tag="button"
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
          >
            <img
              className="rounded-circle header-profile-user mr-1"
              src={profileImg}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ml-1 text-transform">
              {username}
            </span>
            <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="#">
              <i className="ri-user-line align-middle mr-1"></i>{" "}
              {this.props.t("Profile")}
            </DropdownItem>
            {/* <DropdownItem href="#"><i className="ri-wallet-2-line align-middle mr-1"></i> {this.props.t('My Wallet')}</DropdownItem>
                                <DropdownItem className="d-block" href="#"><span className="badge badge-success float-right mt-1">11</span><i className="ri-settings-2-line align-middle mr-1"></i> {this.props.t('Settings')}</DropdownItem>
                                <DropdownItem href="#"><i className="ri-lock-unlock-line align-middle mr-1"></i> {this.props.t('Lock screen')}</DropdownItem>
                                <DropdownItem divider /> */}
            <DropdownItem
              className="text-danger"
              onClick={() => {
                window.sessionStorage.setItem("adminData", null);
                window.location.href = "/login";
              }}
            >
              <i className="ri-shut-down-line align-middle mr-1 text-danger"></i>{" "}
              {this.props.t("Logout")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(ProfileMenu);
