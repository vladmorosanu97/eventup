import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "semantic-ui-react";
import SearchUser from "../../components/search-user/search-user-components/searchUserContainer";

export default class MenuComponent extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        <Menu pointing secondary color="orange">
          <Menu.Item as={Link} to="/home" name="home" active={this.props.page === "home"}>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/new-event" name="new-event" active={this.props.page === "new-event"}>
            New Event
          </Menu.Item>

          <Menu.Item as={Link} to="/my-events" name="my-events" active={this.props.page === "my-events"}>
            My Events
          </Menu.Item>
          <SearchUser />
        </Menu>
      </div>
    );
  }
}
