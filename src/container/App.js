import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { history } from "../helpers";
import PrivateRoute from "./privateRoute";
import LoginPage from "../components/login/LoginPage";
import  Dashboard from "../components/dashboard/Dashboard";
import PageNotFound from "../components/common/PageNotFound";

import "../style/App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
