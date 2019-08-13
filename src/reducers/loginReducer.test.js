import { userConstants } from "../constants/users.constants";
import { auth } from "./auth.reducer";

describe("login auth reduder test", () => {
  test("Login sucess action: LOGIN_SUCCESS", () => {
    const user = { loggedIn: true };
    const newState = auth("undefined", { type: userConstants.LOGIN_SUCCESS });
    expect(newState).toEqual(user);
  });
  test("Login sucess action: LOGIN_FAILURE", () => {
    const user = { loggedIn: false };
    const newState = auth("undefined", { type: userConstants.LOGIN_FAILURE });
    expect(newState).toEqual(user);
  });
});
