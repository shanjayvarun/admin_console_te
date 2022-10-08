import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import PrivateRoute from "./components/PrivateRoute";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path={["/Login", "/"]}>
            <Login />
          </AuthRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}
