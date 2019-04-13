import { combineReducers } from "redux";

// Reducers for all pages
import loginReducer from "../components/login/loginReducer";
import homeReducer from "../components/home/homeReducer";
import createEventReducer from "../components/create-event/createEventReducer";
import eventReducer from "../components/event/eventReducer";
import myEventsReducer from "../components/my-events/myEventsReducer";
// "root reducer"
export default combineReducers({
  login: loginReducer,
  home: homeReducer,
  createEvent: createEventReducer,
  event: eventReducer,
  myEvents: myEventsReducer
});
