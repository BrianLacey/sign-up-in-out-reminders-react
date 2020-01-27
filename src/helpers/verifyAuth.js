import React, { PureComponent, Fragment } from "react";
import { verifyAuth } from "../services/userServices.js";
import { Redirect, Route } from "react-router-dom";

class AuthRoute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verified: null
    };
  }

  componentDidMount = () => {
    verifyAuth()
      .then(result => this.setState({ verified: result }))
      .catch(err => this.setState({ verified: err }));
  };

  nextPath = () => {
    const { verified } = this.state;
    const { component: WrappedComponent, noAuth, ...rest } = this.props;

    switch (verified) {
      case process.env.REACT_APP_VERIFIED:
        return (
          <Route
            {...rest}
            render={routeProps => (
              <WrappedComponent {...routeProps} />
            )}
          />
        );
      case process.env.REACT_APP_NOT_VERIFIED:
        return (
          <Route
            {...rest}
            render={routeProps => <Redirect to={noAuth} {...routeProps} />}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <Fragment>
        {this.nextPath() || (
        <div className="App">
          <header className="App-header"></header>
        </div>
        )}
      </Fragment>
    );
  }
}

export default AuthRoute;
