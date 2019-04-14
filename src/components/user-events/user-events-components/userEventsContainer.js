import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUserEvents, getUserScheduledEvents } from "../userEventsActions";

import UserEventsComponent from "./UserEvents";

const mapStateProps = state => ({
  userEvents: Object.assign({}, state.userEvents)
});

const mapDispatchToProps = dispatch => ({
  onGetUserEvents: userId => {
    dispatch(getUserEvents(userId));
  },
  onGetUserScheduledEvents: userId => {
    dispatch(getUserScheduledEvents(userId));
  }
});

const UserEvents = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(UserEventsComponent)
);

export default UserEvents;
