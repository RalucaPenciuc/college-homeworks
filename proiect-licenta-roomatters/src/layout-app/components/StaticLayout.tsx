import React, { Component } from "react";
import "../scss/StaticLayout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { navigateToUrl } from "single-spa";
import { deleteCookie } from "../services/CookieService";
import FirebaseService from "../services/FirebaseService";

export default class StaticLayout extends Component {
  authService: FirebaseService;

  constructor(props: any) {
    super(props);
    this.authService = FirebaseService.getInstance();
  }

  async handleLogoutButton() {
    const logoutResult: boolean = await this.authService.logoutUser();
    if (logoutResult) {
      deleteCookie("not-token");
      navigateToUrl("/");
    }
  }

  render() {
    return (
      <div className="static-container">
        <div className="static-menu">
          <NavLink to="/dashboard" className="home-link">
            <img
              className="static-app-logo"
              src="../../public/assets/images/app-logo.png"
            />
          </NavLink>
          <div className="static-item-view">
            <NavLink to="/my-account/my-profile">
              <button className="static-button-overlay">
                <FontAwesomeIcon className="static-button-icon" icon={faUser} />
              </button>
            </NavLink>
          </div>
          <div className="static-item-view">
            <NavLink to="/my-apartment">
              <button className="static-button-overlay">
                <FontAwesomeIcon className="static-button-icon" icon={faUsers} />
              </button>
            </NavLink>
          </div>
          <div className="static-item-view">
            <NavLink to="/my-account/messages">
              <button className="static-button-overlay">
                <FontAwesomeIcon className="static-button-icon" icon={faComment} />
              </button>
            </NavLink>
          </div>
          <div className="static-item-view">
            <button
              className="static-button-overlay"
              onClick={this.handleLogoutButton.bind(this)}
            >
              <FontAwesomeIcon className="static-button-icon" icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
