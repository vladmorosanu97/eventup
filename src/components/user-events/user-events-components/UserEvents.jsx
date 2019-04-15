import React, { Component } from "react";
import EventItem from "../../shared/EventItem";

class UserEventsComponent extends Component {
  state = {
    userId: this.props.userId ? this.props.userId : localStorage.getItem("userId")
  };
  componentDidMount = () => {
    this.initializeUserEvents(this.state.userId);
  };

  componentWillReceiveProps = newProps => {
    if (this.props.userId !== newProps.userId) {
      this.setState = {
        userId: newProps.userId ? newProps.userId : localStorage.getItem("userId")
      };
      this.initializeUserEvents(newProps.userId);
    }
  };

  initializeUserEvents = userId => {
    this.props.onGetUserEvents(userId);
    this.props.onGetUserScheduledEvents(userId);
  };

  render() {
    const { isFetchingUserScheduledEvents, isFetchingUserEvents, userEvents, scheduledEvents } = this.props.userEvents;
    return (
      <div className="my-events_container">
        <div class="my-events__container-title">
          <div class="my-events">Promoted events</div>
          <div class="scheduled-events">Scheduled events</div>
        </div>
        <div className="display-flex">
          <div className="my-events-list">
            {!isFetchingUserEvents
              ? userEvents
                  .sort((a, b) => (new Date(a.date.entireDate) > new Date(b.date.entireDate) ? -1 : 1))
                  .map((item, index) => (
                    <EventItem
                      key={index}
                      event={item}
                      className={this.state.activeIndex === index ? "active cursor-default" : "cursor-default"}
                      buttons={this.props.userId === null ? [{ label: "Edit", linkTo: `my-events/${item.eventId}` }] : []} //this.props.userId === my-events page
                    />
                  ))
              : ""}
            {userEvents.length === 0 && !isFetchingUserEvents ? (
              <div className="not-found-section">
                <div className="text-left">There are no events</div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-scheduled-events-list">
            {!isFetchingUserScheduledEvents
              ? scheduledEvents.map((item, index) => (
                  <EventItem key={index} event={item} className={this.state.activeIndex === index ? "active cursor-default" : "cursor-default"} />
                ))
              : ""}
            {scheduledEvents.length === 0 && !isFetchingUserScheduledEvents ? (
              <div className="not-found-section">
                <div className="text-left">There are no events</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserEventsComponent;
