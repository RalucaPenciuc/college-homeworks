import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { navigateToUrl } from "single-spa";

export default class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/dashboard" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/my-account/my-profile" render={() => <Redirect to="/my-account/my-profile" />} />
        <Route exact path="/my-apartment" render={() => <Redirect to="/my-apartment" />} />
        <Route exact path="/my-account/messages" render={() => <Redirect to="/my-account/messages" />} />
      </Switch>
    );
  }
}
