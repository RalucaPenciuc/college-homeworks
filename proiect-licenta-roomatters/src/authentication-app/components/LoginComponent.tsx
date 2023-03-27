import React, { Component } from "react";
import "../scss/GenericStyle.scss";
import { navigateToUrl } from "single-spa";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FirebaseService from "../services/FirebaseService";
import { setCookie } from "../services/CookieService";

interface IState {
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

export default class LoginComponent extends Component<{}, IState> {
  authService: FirebaseService;

  constructor(props: any) {
    super(props);
    this.authService = FirebaseService.getInstance();
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: ""
    };
  }

  async handleLoginButton() {
    try {
      const loginResult: string = await this.authService.loginUser(this.state.email, this.state.password);
      setCookie("not-token", loginResult);
      navigateToUrl("/dashboard");
    } catch (error) {
      this.setState({
        errorMessage: error.message
      });
    }
  }

  render() {
    return (
      <div className="auth-page-container">
        <div className="auth-page-content">
          <img
            className="auth-app-logo"
            src="../../public/assets/images/app-logo.png"
          />
          <div className="auth-form">
            <div className="auth-input-fields">
              <FormControl className="auth-input-field">
                <InputLabel>Email</InputLabel>
                <Input
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <MailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="auth-input-field">
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPassword.bind(this)}
                        onMouseDown={this.handleMouseDownPassword.bind(this)}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className="auth-error-message">{this.state.errorMessage}</div>
            </div>
            <div className="auth-page-actions">
              <button
                className="auth-button"
                onClick={this.handleLoginButton.bind(this)}
              >
                <p className="auth-button-caption">LOGIN</p>
              </button>
              <br />
              <a
                href="/sign-up"
                className="other-auth-link"
                onClick={navigateToUrl}
              >
                I don't have an account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value,
    });
  }

  handleClickShowPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
  }
}
