import { userConstants } from "../constants";

const submit = submit => {
  return { type: userConstants.LOGIN_SUBMITTED, submit };
};

export const formActions = {
  submit
};
