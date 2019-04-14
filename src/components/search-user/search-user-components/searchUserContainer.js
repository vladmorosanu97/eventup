import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { searchUser } from "../searchUserActions";

import SearchUserComponent from "./SearchUser";

const mapStateProps = state => ({
  searchUser: Object.assign({}, state.searchUser)
});

const mapDispatchToProps = dispatch => ({
  onSearchUser: value => {
    dispatch(searchUser(value));
  }
});

const SearchUser = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(SearchUserComponent)
);

export default SearchUser;
