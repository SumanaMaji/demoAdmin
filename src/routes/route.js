import React from "react";
import { Route, Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

const checkUser = () => {
  let user = JSON.parse(sessionStorage.getItem("adminData"));
  if (user != null && Object.keys(user).length > 0) {
    return true;
  } else {
    return false;
  }
};

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected && checkUser() === false) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
