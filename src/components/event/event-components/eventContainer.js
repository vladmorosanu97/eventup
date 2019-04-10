import { connect } from "react-redux";
import CreateEventComponent from "./Event";
import { withRouter } from "react-router-dom";
import EventComponent from "./Event";

import { getEvent } from "../eventActions";

const mapStateProps = state => ({
  event: Object.assign({}, state.event)
});

const mapDispatchToProps = dispatch => ({
  onGetEvent: eventId => {
    dispatch(getEvent(eventId));
  }
});

const Event = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(EventComponent)
);

export default Event;
