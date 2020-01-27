import React, { PureComponent, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { registerValidationHelper } from "../helpers/validationHelper";
import { registerUser } from "../services/userServices.js";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      email: "",
      registerSuccess: false,
      validUserName: true,
      validPassword: true,
      validConfirmPassword: true,
      validPhoneNumber: true,
      validEmail: true
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSignUp = () => {
    const {
      userName,
      password,
      confirmPassword,
      phoneNumber,
      email
    } = this.state;
    const formData = {
      userName,
      password,
      confirmPassword,
      phoneNumber,
      email
    };
    const validInputs = registerValidationHelper(formData);
    this.setState(prevState => {
      const updatedState = { ...prevState, ...validInputs };
      return updatedState;
    });
    const validInputValues = Object.values(validInputs);
    if (validInputValues.includes(false)) {
      return;
    }
    const data = JSON.parse(JSON.stringify(formData));
    delete data.confirmPassword;
    registerUser(data)
      .then(response => {
        alert(response);
        this.setState({ registerSuccess: true });
      })
      .catch(err => {
        if (err === "User already exists") {
          alert("User already exists.");
        } else {
          alert("There was an error. Please try again later.");
        }
      });
  };

  render() {
    const {
      userName,
      password,
      confirmPassword,
      phoneNumber,
      email,
      registerSuccess,
      validUserName,
      validPassword,
      validConfirmPassword,
      validPhoneNumber,
      validEmail
    } = this.state;
    return (
      <Fragment>
        {registerSuccess && <Redirect to="/" />}
        <div className="App">
          <header className="App-header">
            <h3 className="App-header-tags">Sign Up!</h3>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            {!validEmail && (
              <span className="App-error-tags">
                Please enter a valid email.
              </span>
            )}
            <br />
            <label>User Name</label>
            <input
              name="userName"
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={this.handleChange}
            />
            {!validUserName && (
              <span className="App-error-tags">
                Please enter a valid username.
              </span>
            )}
            <br />
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            {!validPassword && (
              <span className="App-error-tags">
                Please enter a valid password.
              </span>
            )}
            <br />
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
            />
            {!validConfirmPassword && (
              <span className="App-error-tags">Passwords do not match.</span>
            )}
            <br />
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={this.handleChange}
            />
            {!validPhoneNumber && (
              <span className="App-error-tags">
                Please enter a valid phone number.
              </span>
            )}
            <br />
            <button type="submit" onClick={this.handleSignUp}>
              Register
            </button>
            <br />
            <br />
            <p>
              Or,&nbsp;&nbsp;
              <Link to="/">
                <button type="button">Sign In</button>
              </Link>
            </p>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default Register;
