import React from "react";
import { shallow } from "enzyme";

import { alertConstants as SAVEKEY } from "../../constants";
import { checkProps } from "../../test/utils";

import { Dashboard } from "./Dashboard";

const initialState = {
  getUser: () => {
    return true;
  },
  user: { firstName: "Luke", lastName: "Skywalker" }
};

test("does not throw warning with expected props: <Dashboard />", () => {
  checkProps(Dashboard, initialState);
});

describe("Test case for <Dashboard /> logged in user", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Dashboard {...initialState} />);
    window.localStorage.setItem(
      SAVEKEY.USERSTORAGE,
      JSON.stringify({ firstName: "Luke" })
    );
  });

  it("check user name on dashboard header", () => {
    const user = JSON.parse(window.localStorage.getItem(SAVEKEY.USERSTORAGE));
    expect(component.find(".navbar-brand .red").text()).toBe(user.firstName);
  });

  it("logout from dashboard", () => {
    component.find(".logout").simulate("click");
    const userSession = localStorage.removeItem(SAVEKEY.USERSTORAGE);

    component.setState({
      ...initialState,
      user: {}
    });
    
    expect(component.state("user").firstName).toStrictEqual(userSession);
  });
});
