import moxios from "moxios";
import axios from "axios";

import { alertConstants } from "../constants";
import { storeFactory } from "../test/utils";
import { userActions } from "../actions/user.actions";

describe("test user login sucess hit API update/get redux state", () => {
  let axiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  let mokedResponse = {
    count: 1,
    next: null,
    previous: null,
    results: [{ name: "Luke Skywalker", birth_year: "19BBY" }]
  };

  let mokedResponseFailed = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  test("validate username and password hit API get state from redux", async () => {
    const username = "Luke Skywalker";
    const password = "19BBY";
    const store = storeFactory();

    moxios.wait(() => {
      moxios.stubRequest(
        `${alertConstants.LOGINBASEURL}/?search=Luke%20Skywalker`,
        {
          status: 200,
          response: mokedResponse
        }
      );
    });

    return store
      .dispatch(await userActions.login(username, password))
      .then(() => {
        const newState = store.getState();
        expect(newState.auth.user.userFullName).toBe(username);
        expect(newState.auth.user.birthYear).toBe(password);
      });
  });

  test("invalid username and password  hit API get state from redux", async () => {
    const username = "wrong user";
    const password = "19BBY";
    const store = storeFactory();

    moxios.wait(() => {
      moxios.stubRequest(
        `${alertConstants.LOGINBASEURL}/?search=wrong%20user`,
        {
          status: 200,
          response: mokedResponseFailed
        }
      );
    });

    return store
      .dispatch(await userActions.login(username, password))
      .then(() => {
        const newState = store.getState();
        expect(newState.auth.loggedIn).toBe(false);
      });
  });
});
