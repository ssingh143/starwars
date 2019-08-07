import { combineReducers } from "redux";

import { auth } from "./auth.reducer";
import { alert } from "./alert.reducer";
import { form } from "./form.reducer";
import { search } from "./search.reducer";

const rootReducer = combineReducers({
  auth,
  alert,
  form,
  search
});

export default rootReducer;
