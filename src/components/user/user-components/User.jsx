import React, { Component } from "react";
import UserEvents from "../../user-events/user-events-components/userEventsContainer";
import video from "../../../services/180301_15_B_KowloonPark_06.mp4";
import { Image, Segment, Loader } from "semantic-ui-react";
class User extends Component {
  state = {
    userId: this.props.match.params.userId
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.initializeUserDetails(this.props.match.params.userId);
  };

  componentWillReceiveProps = newProps => {
    if (this.props.match.params.userId != newProps.match.params.userId) {
      this.setState({
        userId: newProps.match.params.userId
      });
      this.initializeUserDetails(newProps.match.params.userId);
    }
  };

  initializeUserDetails = userId => {
    this.props.onGetUserDetails(userId);
  };

  render() {
    console.log(this.props);
    const { isFetching, userDetails } = this.props.user;
    const { userId } = this.state;
    return (
      <>
        <div className="container-video">
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="overlay" />

        <div className="user-profile">
          {!isFetching ? (
            <>
              <img className="user-image" src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
              <div className="user-profile-container">
                <div className="user-name">
                  {userDetails.firstName} {userDetails.lastName}
                </div>
                <div className="user-description">{userDetails.email}</div>
              </div>
            </>
          ) : (
            <Segment>
              <Loader active inline="centered" />
            </Segment>
          )}
        </div>
        <UserEvents userId={userId} />
      </>
    );
  }
}

export default User;
