import React, { PureComponent, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { signInValidationHelper } from "../helpers/validationHelper.js";
import { signInUser } from "../services/userServices.js";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      signedIn: false,
      validUserName: true,
      validPassword: true
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSignIn = () => {
    const { userName, password } = this.state;
    const formData = {
      password
    };
    if (userName.includes("@")) {
      formData.email = userName;
    } else {
      formData.userName = userName;
    }
    const validInputs = signInValidationHelper(formData);
    this.setState(prevState => {
      const updatedState = { ...prevState, ...validInputs };
      return updatedState;
    });
    const validInputValues = Object.values(validInputs);
    if (validInputValues.includes(false)) {
      return;
    }
    const data = JSON.parse(JSON.stringify(formData));
    signInUser(data)
      .then(response => {
        alert(response);
        this.setState({ signedIn: true });
      })
      .catch(err => alert(err));
  };

  render() {
    const {
      userName,
      password,
      validUserName,
      validPassword,
      signedIn
    } = this.state;
    return (
      <Fragment>
        {signedIn && <Redirect to="/home" />}
        <div className="App">
          <header className="App-header">
            <h3 className="App-header-tags">Sign In!</h3>
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
                Please enter a valid Email or User Name.
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
            <button type="submit" onClick={this.handleSignIn}>
              Sign In
            </button>
            <br />
            <br />
            <p>
              Or,&nbsp;&nbsp;
              <Link to="/register">
                <button type="button">Register</button>
              </Link>
            </p>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
