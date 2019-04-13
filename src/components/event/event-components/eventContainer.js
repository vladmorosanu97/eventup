import { connect } from "react-redux";
import CreateEventComponent from "./Event";
import { withRouter } from "react-router-dom";
import EventComponent from "./Event";

import {
  getEvent,
  getWeatherApi,
  joinUserToEvent,
  cancelUserParticipation
} from "../eventActions";

const mapStateProps = state => ({
  event: Object.assign({}, state.event)
});

const mapDispatchToProps = dispatch => ({
  onGetEvent: (eventId, initializeMap) => {
    dispatch(getEvent(eventId, initializeMap));
  },

  onJoinUserToEvent: (userDetails, eventId) => {
    dispatch(joinUserToEvent(userDetails, eventId));
  },

  onCancelUserParticipation: (userId, eventId) => {
    dispatch(cancelUserParticipation(userId, eventId));
  }
});

const Event = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(EventComponent)
);

export default Event;
