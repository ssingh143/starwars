import { alertConstants } from "../constants";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "alert-danger",
        message: action.message,
        submit: false
      };
    case alertConstants.CLEAR:
      return {
        submit: false
      };
    default:
      return state;
  }
}
