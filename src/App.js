import React from "react";
import "./App.css";
import Register from "./signing/register.js";
import SignIn from "./signing/signIn.js";
import HomePage from "./homePage.js";
import AuthRoute from "./helpers/verifyAuth.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/register" component={Register} />
        <AuthRoute path="/home" component={HomePage} noAuth="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
