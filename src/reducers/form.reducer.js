import { userConstants } from "../constants";

const initialState = { submit: false };

export function form(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUBMITTED:
      return {
        submitted: action.submit
      };
    default:
      return state;
  }
}
