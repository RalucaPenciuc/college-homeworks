import React, { Component } from "react";
import "../scss/GenericStyle.scss";
import { navigateToUrl } from "single-spa";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FirebaseService from "../services/FirebaseService";
import { setCookie } from "../services/CookieService";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

export default class SignUpComponent extends Component<{}, IState> {
  authService: FirebaseService;

  constructor(props: any) {
    super(props);
    this.authService = FirebaseService.getInstance();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showPassword: false,
      errorMessage: ""
    }
  }

  async handleSignUpButton() {
    try {
      const signUpResult: string = await this.authService.signUpUser(this.state.email, this.state.password, this.state.firstName, this.state.lastName);
      if (signUpResult) {
        setCookie("not-token", signUpResult);
        navigateToUrl("/dashboard");  
      } else {
        this.setState({
          errorMessage: "Unknown sign up error"
        });
      }
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
          <img className="auth-app-logo" src="../../public/assets/images/app-logo.png" />
          <div className="auth-form">
            <div className="auth-input-fields">
              <FormControl className="auth-input-field">
                <InputLabel>First Name</InputLabel>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <PersonIcon/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="auth-input-field">
                <InputLabel>Last Name</InputLabel>
                <Input
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <PersonIcon/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="auth-input-field">
                <InputLabel>Email</InputLabel>
                <Input
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <MailIcon/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="auth-input-field">
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPassword.bind(this)}
                        onMouseDown={this.handleMouseDownPassword.bind(this)}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
                onClick={this.handleSignUpButton.bind(this)}
              >
                <p className="auth-button-caption">SIGN UP</p>
              </button>
              <br />
              <a href="/login" className="other-auth-link" onClick={navigateToUrl}>
                I already have an account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.target.value
    });

  }

  handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value
    });
  }

  handleClickShowPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
  }
}