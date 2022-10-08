import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  children,
  history,
  location = {},
  ...rest
}) {
  if (sessionStorage.getItem("token")) {
    return (
      <>
        <Redirect to={{ pathname: "/dashboard" }} />
        <Route {...rest}>{children}</Route>
      </>
    );
  } else {
    return (
      <>
        <Redirect to={{ pathname: "/login" }} />
      </>
    );
  }
}
