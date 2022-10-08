import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function AuthRoute({ children, ...rest }) {
  if (sessionStorage.getItem("token")) {
    return (
      <>
        <Redirect to={{ pathname: "/dashboard" }} />
      </>
    );
  } else {
    return <Route {...rest}>{children}</Route>;
  }
}
