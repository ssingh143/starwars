import { searchConstants } from "../constants";
import { searchServices } from "../services";

const search = query => {
  return dispatch => {
    dispatch(request(query, true));
    searchServices.searchPlanet(query).then(result => {
      if (result === 404) {
        dispatch(failure(query, searchConstants.SEAERCHNOTFOUND, false));
      } else if (result === 'noresult') {
        dispatch(resetResult(query, result, false));
      } else {
        if (result === 503) {
          dispatch(failure(query, searchConstants.NETWORKERROR, false));
        } else {
          dispatch(success(query, result, false));
        }
      }
    });
  };

  function request(query, isLoading) {
    return { type: searchConstants.SEARCHREQUEST, query, isLoading };
  }
  function success(query, data, isLoading) {
    return { type: searchConstants.SEARCHSUCCESS, query, data, isLoading };
  }
  function resetResult(query, message, isLoading) {
    return { type: searchConstants.SEARCHRESET, query, message, isLoading };
  }
  function failure(query, message, isLoading) {
    return { type: searchConstants.SEARCHFAILURE, query, message, isLoading };
  }
};

export const searchAction = {
  search
};
