import { connect } from "react-redux";
import CreateEventComponent from "./Event";
import { withRouter } from "react-router-dom";
import EventComponent from "./Event";

import { getEvent, getWeatherApi } from "../eventActions";

const mapStateProps = state => ({
  event: Object.assign({}, state.event)
});

const mapDispatchToProps = dispatch => ({
  onGetEvent: (eventId, initializeMap) => {
    dispatch(getEvent(eventId, initializeMap));
  }
});

const Event = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(EventComponent)
);

export default Event;
