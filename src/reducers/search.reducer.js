import { searchConstants } from "../constants";

const initialState = { results: [] };

export function search(state = initialState, action) {
  switch (action.type) {
    case searchConstants.SEARCHREQUEST:
      return {
        query: action.query,
        isLoading: action.isLoading
      };
    case searchConstants.SEARCHSUCCESS:
      return {
        query: action.query,
        results: action.data,
        isLoading: action.isLoading
      };
    case searchConstants.SEARCHFAILURE:
      return {
        query: action.query,
        error: action.message,
        isLoading: action.isLoading
      };
    case searchConstants.SEARCHRESET:
      return {
        query: action.query,
        results: {},
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}
