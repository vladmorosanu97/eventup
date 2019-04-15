import React, { Component } from "react";
import { Search } from "semantic-ui-react";
class SearchUser extends Component {
  state = {};

  handleLocationInput = (ev, data) => {
    this.setState({ suggestionForUser: data.value }, () => {
      if (data.value !== "") {
        this.props.onSearchUser(data.value);
      }
    });
  };

  handleUpdateFormState = (ev, data) => {
    this.props.history.push(`/users/${data.result.userId}`);
    this.setState({
      suggestionForUser: ""
    });
  };
  render() {
    const { isFetchingSearch, users } = this.props.searchUser;
    const { suggestionForUser } = this.state;
    return (
      <>
        <Search
          fluid
          placeholder={"Search user..."}
          loading={isFetchingSearch}
          onResultSelect={(ev, data) => this.handleUpdateFormState(ev, data)}
          onSearchChange={(ev, data) => this.handleLocationInput(ev, data)}
          results={users.map(s => ({ ...s, title: s.firstName + " " + s.lastName }))}
          value={suggestionForUser}
          // className="location-field"
        />
      </>
    );
  }
}

export default SearchUser;
