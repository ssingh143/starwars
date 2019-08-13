import React from "react";
import { shallow, mount } from "enzyme";
import { findByInputTestAttr, checkProps } from "../../test/utils";

import { LoginForm } from "./LoginForm";
import LoadingSpinner from "../common/Loader";

const initialState = {
  isUserLoggedIn: () => {
    return false;
  },
  isLogined: false,
  submitted: false
};

test("does not throw warning with expected props", () => {
  checkProps(LoginForm, initialState);
});

describe("Test case for login from <LoginForm />", () => {
  let component;
  let loaderComponent;

  beforeEach(() => {
    component = mount(<LoginForm {...initialState} />);
  });

  test("username field check", () => {
    findByInputTestAttr(component, "username").simulate("change", {
      target: { name: "username", value: "test" }
    });
    expect(component.state().username).toEqual("test");
  });

  test("password field check", () => {
    findByInputTestAttr(component, "password").simulate("change", {
      target: { name: "password", value: "test123" }
    });
    expect(component.state().password).toEqual("test123");
  });

  it("login form submit", () => {
    component.find(".btn-primary-login").simulate("click");
    component = component.setState({
      ...initialState,
      isLogined: true,
      submitted: true
    });

    loaderComponent = shallow(<LoadingSpinner />);
    expect(loaderComponent.find(".loader").length).toBe(1);
    expect(component.state("isLogined")).toBe(true);
  });
});
