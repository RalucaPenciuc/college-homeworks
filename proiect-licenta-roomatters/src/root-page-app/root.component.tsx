import React, { Component } from "react";
import { navigateToUrl } from "single-spa";
import "./scss/RootPageApp.scss";

export default class RootPageApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in RootPage: ", error, info);
  }

  render() {
    return (
      <div className="home-image">
        <div className="start-point">
          <div className="welcome-text">
            <div className="home-page-title">
              <span className="title-section1">Welcome to</span>
              <span className="title-section2">Roomatters</span>
            </div>
            <span className="description-section">
              Find your new home. Keep in touch with your housemates.{"\n"}All
              in one place.
            </span>
          </div>
          <div className="page-actions">
            <button
              className="register-button"
              onClick={() => navigateToUrl("/sign-up")}
            >
              <p className="register-button-caption">JOIN NOW</p>
            </button>
            <br />
            <a href="/login" className="login-link" onClick={navigateToUrl}>
              I already have an account.
            </a>
          </div>
        </div>
        <img
          className="start-page-app-logo"
          src="../../public/assets/images/app-logo.png"
        />
      </div>
    );
  }
}
