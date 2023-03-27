import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";

export default class AuthComponent extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/sign-up" component={SignUpComponent} />
      </Switch>
    );
  }
}
