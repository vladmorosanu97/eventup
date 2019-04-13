import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

//page components
import WithAuth from "../core/auth/WithAuth";
import MainLayout from "../core/mainLayout/MainLayout";
import Login from "../components/login/loginComponents/loginContainer";
import Home from "../components/home/homeComponents/homeContainer";
import CreateEvent from "../components/create-event/create-event-components/createEventContainer";
import Event from "../components/event/event-components/eventContainer";
import MyEvents from "../components/my-events/my-events-components/myEventsContainer";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* Protected routes */}
          <Route
            exact
            path="/home"
            render={props => (
              <WithAuth {...props}>
                <MainLayout {...props}>
                  <Home />
                </MainLayout>
              </WithAuth>
            )}
          />

          <Route
            exact
            path="/new-event"
            render={props => (
              <WithAuth {...props}>
                <MainLayout {...props}>
                  <CreateEvent />
                </MainLayout>
              </WithAuth>
            )}
          />

          <Route
            exact
            path="/event/:eventId"
            render={props => (
              <WithAuth {...props}>
                <MainLayout {...props}>
                  <Event />
                </MainLayout>
              </WithAuth>
            )}
          />

          <Route
            exact
            path="/my-events"
            render={props => (
              <WithAuth {...props}>
                <MainLayout {...props}>
                  <MyEvents />
                </MainLayout>
              </WithAuth>
            )}
          />
          {/* <Route path="/event/:eventId" component={Event} /> */}

          {/* When you insert a wrong route you will be automatically redirect to login screen */}
          <Route component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state
  };
};

export default connect(mapStateToProps)(App);
