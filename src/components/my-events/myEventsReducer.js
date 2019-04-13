import { actionTypes } from "./myEventsActions";

var initialState = {
  isFetchingMyEvents: false,
  isFetchingMyScheduledEvents: false,
  myEvents: [],
  scheduledEvents: []
};

export default function myEventsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_MY_EVENTS_LIST:
      return {
        ...state,
        isFetchingMyEvents: true
      };

    case actionTypes.RECEIVE_MY_EVENTS_LIST:
      return {
        ...state,
        isFetchingMyEvents: false,
        myEvents: action.data
      };

    case actionTypes.REQUEST_MY_SCHEDULED_EVENTS_LIST:
      return {
        ...state,
        isFetchingMyScheduledEvents: true
      };

    case actionTypes.RECEIVE_MY_SCHEDULED_EVENTS_LIST:
      return {
        ...state,
        isFetchingMyScheduledEvents: false,
        scheduledEvents: action.data
      };
    default:
      return state;
  }
}
