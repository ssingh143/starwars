import { userConstants, alertConstants } from "../constants";
import { userService } from "../services";

import { alertActions, formActions } from "./";

const login = (username, password) => {
  return dispatch => {
    dispatch(request({ username }));
    dispatch(formActions.submit(true));
    return userService.login(username, password).then(user => {
      if (user === 404) {
        dispatch(failure(alertConstants.USERINVALID));
        dispatch(alertActions.error(alertConstants.USERINVALID));
        dispatch(formActions.submit(false));
      } else {
        dispatch(success(user));
        dispatch(formActions.submit(false));
      }
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

const logout = () => {
  return dispatch => {
    userService.logout().then(() => {
      dispatch(alertActions.clear());
      dispatch(deleteSuccess());
    });
  };
  function deleteSuccess() {
    return { type: userConstants.LOGOUT };
  }
};

const getUser = () => {
  return dispatch => {
    dispatch(request());
    userService.getUser().then(
      user => {
        dispatch(success(user));
      },
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GETUSER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETUSER_FAILURE, error };
  }
};

const loadUser = isSubmitted => {
  return dispatch => {
    dispatch(formActions.submit(isSubmitted));
  };
};

export const userActions = {
  login,
  logout,
  getUser,
  loadUser
};
