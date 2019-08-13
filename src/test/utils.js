import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers";
import { middleware } from "../helpers/store";

export const storeFactory = initialState => {
  const creteSoterWithMiddleWare = applyMiddleware(...middleware)(createStore);
  return creteSoterWithMiddleWare(rootReducer, initialState);
};

export const findByInputTestAttr = (wrapper, val) => {
  return wrapper.find(`input[name="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
