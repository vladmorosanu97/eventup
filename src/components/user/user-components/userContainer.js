import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import { getMyEvents, getMyScheduledEvents } from "../myEventsActions";

import UserComponent from "./User";

const mapStateProps = state => ({
  myEvents: Object.assign({}, state.user)
});

const mapDispatchToProps = dispatch => ({});

const User = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(UserComponent)
);

export default User;
