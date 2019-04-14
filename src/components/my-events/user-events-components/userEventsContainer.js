import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getMyEvents, getMyScheduledEvents } from "../userEventsActions";

import UserEventsComponent from "./UserEvents";

const mapStateProps = state => ({
  userEvents: Object.assign({}, state.userEvents)
});

const mapDispatchToProps = dispatch => ({
  onGetMyEvents: userId => {
    dispatch(getMyEvents(userId));
  },
  onGetMyScheduledEvents: userId => {
    dispatch(getMyScheduledEvents(userId));
  }
});

const UserEvents = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(UserEventsComponent)
);

export default UserEvents;
