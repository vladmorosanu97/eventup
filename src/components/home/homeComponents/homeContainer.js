import { connect } from "react-redux";
import HomeComponent from "./Home";
import { getEventList, requestSearchEvents } from "../homeActions";

const mapStateProps = state => ({
  home: Object.assign({}, state.home)
});

const mapDispatchToProps = dispatch => ({
  onGetEventList: () => {
    dispatch(getEventList());
  },

  onSearchEvent: value => {
    dispatch(requestSearchEvents(value));
  }
});

const Home = connect(
  mapStateProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;
