import React, { Component } from "react";

import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
  FormGroup,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-d.png";

import HttpClient from "./../../utils/HttpClient";
import { reactLocalStorage } from "reactjs-localstorage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      msg: "",
      success: false,
      remember: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event, values) {
    if (this.state.email == "" && this.state.password == "") {
      this.setState({ error: true, msg: "Please enter email and password" });
      return false;
    }

    let data = { email: this.state.email, password: this.state.password };
    let result = await HttpClient.requestData("admin/login", "POST", data);
    console.log("login user-->"+ JSON.stringify(data)+ JSON.stringify(result));
    if (result && result.status) {
      if (this.state.remember) {
        reactLocalStorage.setObject("remember", data);
      } else {
        reactLocalStorage.remove("remember");
      }
      sessionStorage.setItem("adminData", JSON.stringify(result.data));
      this.setState({ error: false, success: true, msg: "Login Successfull." });
      setTimeout(() => {
        this.setState({ success: false });
        this.props.history.push("/dashboard");
      }, 100);
    } else {
      this.setState({ error: true, msg: "Invaild email or password" });
    }
  }

  remberMe = () => {
    this.setState({ remember: !this.state.remember });
  };

  componentDidMount() {
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
    let user = JSON.parse(sessionStorage.getItem("adminData"));
    if (user !== null && Object.keys(user).length > 0) {
      // return true;
      window.location.href = "/dashboard";
    }
    let rember = reactLocalStorage.getObject("remember");
    if (rember !== null && Object.keys(rember).length > 0) {
      this.setState({
        remember: true,
        email: rember.email,
        password: rember.password,
      });
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          {/* <Link to="/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link> */}
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={4}>
                <div
                  className="authentication-page-content p-4 d-flex align-items-center min-vh-100"
                  style={{ backgroundColor: " rgb(184 226 235)" }}
                >
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img src={logodark} alt="logo" />
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">
                              Welcome !
                            </h4>
                            <p className="text-muted">
                              Sign in to continue to Admin.
                            </p>
                          </div>

                          {this.state.error ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                          ) : null}

                          {this.state.success ? (
                            <Alert color="green">{this.state.msg}</Alert>
                          ) : null}

                          <div className="p-2 mt-5">
                            <AvForm
                              className="form-horizontal"
                              onValidSubmit={this.handleSubmit}
                            >
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="name">Username</Label>
                                <AvField
                                  name="name"
                                  value={this.state.email}
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  validate={{ required: true }}
                                  placeholder="Enter username"
                                  onChange={(val) => {
                                    this.setState({ email: val.target.value });
                                  }}
                                />
                              </FormGroup>

                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  onChange={(val) => {
                                    this.setState({
                                      password: val.target.value,
                                    });
                                  }}
                                />
                              </FormGroup>

                              <div className="custom-control custom-checkbox">
                                <Input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customControlInline"
                                  onChange={this.remberMe}
                                  checked={this.state.remember}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Log In
                                </Button>
                              </div>

                              {/* <div className="mt-4 text-center">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock mr-1"></i> Forgot
                                  your password?
                                </Link>
                              </div> */}
                            </AvForm>
                          </div>
                          <div className="mt-5 text-center">
                          {/* <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Register</Link> </p>
                                                <p>© 2020 Admin.</p> */}
                                            </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
