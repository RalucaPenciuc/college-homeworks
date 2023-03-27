import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MyProfileComponent from "./MyProfileComponent";
import MessagesComponent from "./MessagesComponent";

export default class MyAccountRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/my-account/my-profile" component={MyProfileComponent} />
        <Route exact path="/my-account/messages" component={MessagesComponent} />
      </Switch>
    );
  }
}
