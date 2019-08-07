import { userConstants, alertConstants as SAVEKEY } from "../constants";

let user = JSON.parse(localStorage.getItem(SAVEKEY.USERSTORAGE));
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: action.user
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
}
