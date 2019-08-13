import React from "react";
import { mount } from "enzyme";

import { findByInputTestAttr, checkProps } from "../../test/utils";

import { SearchBar } from "./SearchBar";

const initialState = {
  query: "",
  isLoading: false,
  hitCount: 0,
  session: false
};

test("does not throw warning with expected props: <SearchBar />", () => {
  checkProps(SearchBar, initialState);
});

describe("Test case for <SearchBar  onSearch={onSearchMock} />", () => {
  let component;
  let onSearchMock = jest.fn();
  let input;
  let options = [
    { name: "Haruun Kal", Population: "705300" },
    { name: "Saleucami", Population: "1400000000" },
    { name: "Alderaan", Population: "2000000000" }
  ];
  let props = {
      className: "",
      onChange: jest.fn().mockReturnValue(Promise.resolve()),
      value: undefined,
      disabled: false,
      search: jest.fn(),
      options,
      refSearch: ""
    },
    searchText = "alderaan",
    spy;

  beforeEach(() => {
    props = {
      ...props,
      loadOptions: jest.fn().mockReturnValue(Promise.resolve(options)),
      options: [],
      refSearch: onSearchMock
    };

    component = mount(<SearchBar {...props} onChange={onSearchMock} />);
    component.instance().refSearch.current = { value: searchText };
    findByInputTestAttr(component, "query").simulate("change");
    input = component.find("input");
  });

  test("search input change value and match", () => {
    findByInputTestAttr(component, "query").simulate("change");
    component.setState({ ...initialState, query: "test" });
    expect(component.state("query")).toEqual("test");
  });

  it("when you type less than min characters", () => {
    input.simulate("change", { target: { value: "a" } });
    component.setState({ options: [], isLoading: true });
    expect(component.state()).toHaveProperty("isLoading", true);
    expect(component.state()).toHaveProperty("options", []);
    expect(props.loadOptions).not.toBeCalled();
  });

  it("when key pressed in search input", () => {
    spy = jest.spyOn(component.instance(), "onChange");
    component.setState({ ...initialState, isLoading: true, query: searchText });
    input.simulate("keydown", { keyCode: 8, which: 46 });
    expect(spy).toBeCalled();
    expect(component.state()).toHaveProperty("isLoading", true);
  });

  it("you type more than min characters valid search keyword", done => {
    spy = jest.spyOn(component.instance(), "onChange");
    input.simulate("change", { target: { value: searchText } });
    input.simulate("keydown", { keyCode: 8, which: 46 });
    component.setState({ ...initialState, isLoading: true, query: searchText });
    expect(component.state()).toHaveProperty("isLoading", true);
    expect(spy).toBeCalled();
    expect(component.state()).toHaveProperty("query", searchText);
    setTimeout(() => {
      component.setState({
        ...initialState,
        isLoading: false,
        options: options
      });
      expect(component.state()).toHaveProperty("isLoading", false);
      expect(component.state().options).toEqual(options);
      done();
    });
  });
});
