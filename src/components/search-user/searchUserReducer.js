import { actionTypes } from "./searchUserActions";

var initialState = {
  isFetchingSearch: false,
  users: []
};

export default function searchUserReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_SEARCH_USER:
      return {
        ...state,
        isFetchingSearch: true
      };

    case actionTypes.RECEIVE_SEARCH_USER:
      return {
        ...state,
        isFetchingSearch: false,
        users: action.data
      };
    default:
      return state;
  }
}
