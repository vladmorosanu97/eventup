import { actionTypes } from "./userEventsActions";

var initialState = {
  isFetchingUserEvents: false,
  isFetchingUserScheduledEvents: false,
  userEvents: [],
  scheduledEvents: []
};

export default function myEventsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_EVENTS:
      return {
        ...state,
        isFetchingUserEvents: true
      };

    case actionTypes.RECEIVE_USER_EVENTS:
      return {
        ...state,
        isFetchingUserEvents: false,
        userEvents: action.data
      };

    case actionTypes.REQUEST_USER_SCHEDULED_EVENTS:
      return {
        ...state,
        isFetchingUserScheduledEvents: true
      };

    case actionTypes.RECEIVE_USER_SCHEDULED_EVENTS:
      return {
        ...state,
        isFetchingUserScheduledEvents: false,
        scheduledEvents: action.data
      };
    default:
      return state;
  }
}
