import React, { Component } from "react";
import { BrowserRouter} from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import { getCookie } from "./services/CookieService";
import { navigateToUrl } from "single-spa";

export default class AuthenticationApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in RootPage: ", error, info);
  }

  render() {
    if (getCookie("not-token")) {
      navigateToUrl("/dashboard");
      return <div></div>;
    } else {
      return (
        <BrowserRouter>
          <AuthComponent />
        </BrowserRouter>
      );
    }
  }
}
