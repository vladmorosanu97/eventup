import React, { Component } from "react";
import MyEvents from "../../my-events/my-events-components/myEventsContainer";

class User extends Component {
  // constructor(props) {
  //   super(props);
  //   const {
  //     match: { params }
  //   } = this.props;
  //   this.state = {
  //     userId: params.userId
  //   };
  // }
  state = {
    userId: this.props.match.params.userId
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const {
      match: { params }
    } = this.props;
    console.log(params.userId);
  }
  render() {
    // console.log(this.props.match.params.userId);
    return <MyEvents userId={this.state.userId} />;
  }
}

export default User;
