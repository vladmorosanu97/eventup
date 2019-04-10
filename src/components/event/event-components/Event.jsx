import React, { Component } from "react";
import video from "../../../services/night.mp4";
import { Button, Card, Icon } from "semantic-ui-react";
import { DatetimePicker } from "rc-datetime-picker";
import moment from "moment";
import Calendar from "../../shared/Calendar";
export default class EventComponent extends Component {
  state = {
    moment: moment()
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.initializeEvent(params.eventId);
  }

  initializeEvent = eventId => {
    this.props.onGetEvent(eventId);
  };

  render() {
    const { isFetching, event } = this.props.event;
    console.log(event);
    return (
      <div>
        <div className="container-video">
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="overlay" />
        <div className="event-section">
          <div className="title-section">
            <h1 className="title">{event.title}</h1>
            <p className="header">{event.description}</p>
            <div className="buttons">
              <Button basic inverted>
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="event-description-section">
          <div className="event-description-section-container">
            <div className="event-description">
              <div>
                <div className="event_item-info-location">
                  <i className="map marker alternate grey icon" />
                  {event.location.title}
                </div>
                <div className="event_item-info-section">
                  <div className="event_item-info-section-label">
                    <i className="circle orange icon tiny" />
                    <span>Description:</span>
                  </div>
                  {event.description}
                </div>
                <div className="event_item-info-section">
                  <div className="event_item-info-section-label">
                    <i className="circle orange icon tiny" />
                    <span>Organizer:</span>
                  </div>
                  {event.organizer}
                </div>
                <div className="event_item-info-section">
                  <div className="event_item-info-section-label">
                    <i className="circle orange icon tiny" />
                    <span>Category:</span>
                  </div>
                  {event.category}
                </div>
              </div>
            </div>
            <Calendar day={event.date.day} month={event.date.month} time={event.date.entireDate.substring(event.date.entireDate.length-8, event.date.entireDate.length)}/>
          </div>
        </div>
        <div
          className={`ui ${isFetching ? "active" : "disabled"} inverted dimmer`}
        >
          <div className="ui medium loader" />
        </div>
      </div>
    );
  }
}
