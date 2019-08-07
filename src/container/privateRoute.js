import React from "react";
import { Route, Redirect } from "react-router-dom";

import { alertConstants as SAVEKEY } from "../constants";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(SAVEKEY.USERSTORAGE) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
