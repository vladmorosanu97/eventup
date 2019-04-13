import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getMyEvents, getMyScheduledEvents } from "../myEventsActions";

import MyEventsComponent from "./MyEvents";

const mapStateProps = state => ({
  myEvents: Object.assign({}, state.myEvents)
});

const mapDispatchToProps = dispatch => ({
  onGetMyEvents: userId => {
    dispatch(getMyEvents(userId));
  },
  onGetMyScheduledEvents: userId => {
    dispatch(getMyScheduledEvents(userId));
  }
});

const MyEvents = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(MyEventsComponent)
);

export default MyEvents;
