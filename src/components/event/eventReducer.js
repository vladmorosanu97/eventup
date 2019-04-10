import { categoryOptions } from "../../utils/utils";
import { actionTypes } from "./eventActions";

var initialState = {
  isFetching: false,
  event: {
    title: "",
    organizer: "",
    description: "",
    location: {
      id: "",
      title: "",
      latitude: "",
      longitude: ""
    },
    date: {
      day: "",
      month: "",
      entireDate: ""
    },
    category: ""
  }
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_EVENT:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.RECEIVE_EVENT:
      return {
        ...state,
        isFetching: false,
        event: {
          ...action.data.event
        }
      };
    default:
      return state;
  }
}
