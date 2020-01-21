import React, { PureComponent, Fragment } from "react";
import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      phoneNumber: "",
      email: "",
      signUp: false
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChangeToSignUp = () => this.setState({ signUp: true });
  handleChangeToSignIn = () => this.setState({ signUp: false });

  render() {
    const { signup } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {signup === false ? (
            <Fragment>
              <p>Sign In!</p>
              <button onClick={this.handleChangeToSignUp}>Register</button>
            </Fragment>
          ) : (
            <Fragment>
              <p>Sign Up!</p>
              <button onClick={this.handleChangeToSignIn}>Sign In</button>
            </Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default App;
