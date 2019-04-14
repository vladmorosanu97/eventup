import { actionTypes } from "./userActions";

var initialState = {
  isFetching: false,
  userDetails: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_DETAILS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.RECEIVE_USER_DETAILS:
      return {
        ...state,
        isFetching: false,
        userDetails: action.data
      };
    default:
      return state;
  }
}
