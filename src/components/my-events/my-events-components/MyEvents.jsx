import React, { Component } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import EventItem from "../../shared/EventItem";

class MyEventsComponent extends Component {
  state = {};
  componentDidMount = () => {
    this.initializeMyEvents();
  };

  initializeMyEvents = () => {
    let userId = localStorage.getItem("userId");
    this.props.onGetMyEvents(userId);
    this.props.onGetMyScheduledEvents(userId);
  };

  render() {
    const { isFetchingMyScheduledEvents, isFetchingMyEvents, myEvents, scheduledEvents } = this.props.myEvents;
    return (
      <div className="my-events_container">
        <div class="my-events__container-title">
          <div class="my-events">Promoted events</div>
          <div class="scheduled-events">Scheduled events</div>
        </div>
        <div className="display-flex">
          <div className="my-events-list">
            {!isFetchingMyEvents
              ? myEvents.map((item, index) => (
                  <EventItem key={index} event={item} className={this.state.activeIndex === index ? "active cursor-default" : "cursor-default"} />
                ))
              : ""}
            {myEvents.length == 0 && !isFetchingMyEvents ? (
              <div className="not-found-section">
                <div className="text-left">There are no events</div>
                {/* <NotFoundImage width="300" height="300" /> */}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-scheduled-events-list">
            {!isFetchingMyScheduledEvents
              ? scheduledEvents.map((item, index) => (
                  <EventItem key={index} event={item} className={this.state.activeIndex === index ? "active cursor-default" : "cursor-default"} />
                ))
              : ""}
            {scheduledEvents.length == 0 && !isFetchingMyScheduledEvents ? (
              <div className="not-found-section">
                <div className="text-left">There are no events</div>
                {/* <NotFoundImage width="300" height="300" /> */}
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

export default MyEventsComponent;
