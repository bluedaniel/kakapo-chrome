import React from "react";
import { Route } from "react-router";
import { App } from "../containers";

export default (
  <Route component={App} path="/">
    <Route component="" path="*"/>
  </Route>
);
