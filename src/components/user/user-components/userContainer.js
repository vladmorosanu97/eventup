import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUserDetails } from "../userActions";

import UserComponent from "./User";

const mapStateProps = state => ({
  user: Object.assign({}, state.user)
});

const mapDispatchToProps = dispatch => ({
  onGetUserDetails: userId => {
    dispatch(getUserDetails(userId));
  }
});

const User = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(UserComponent)
);

export default User;
