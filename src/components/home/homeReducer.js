import { actionTypes } from "./homeActions";

var initialState = {
  isFetching: false,
  isFetchingSearch: false,
  eventList: [],
  filteredEventList: [],
  calculateDistanceFailed: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_EVENT_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_EVENT_LIST:
      return {
        ...state,
        isFetching: false,
        eventList: action.data.eventList,
        filteredEventList: action.data.eventList
      };

    case actionTypes.CALCULATE_DISTANCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        eventList: action.data,
        calculateDistanceFailed: false,
        filteredEventList: action.data
      };
    case actionTypes.CALCULATE_DISTANCES_FAILED:
      return {
        ...state,
        calculateDistanceFailed: true
      };

    case actionTypes.SEARCH_EVENT:
      return {
        ...state,
        filteredEventList: state.eventList.filter(
          event =>
            event.title.toLowerCase().includes(action.search.toLowerCase()) ===
            true
        )
      };
    default:
      return state;
  }
}
