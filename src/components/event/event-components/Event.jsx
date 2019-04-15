import React, { Component } from "react";
import video from "../../../services/night.mp4";
import { Button, Card, Icon, Message, Dimmer, Loader, Segment, Image } from "semantic-ui-react";
import moment from "moment";
import Calendar from "../../shared/Calendar";
import OlMapFunction from "../../../services/map/OlMap";
import Weather from "./Weather";
import { Link } from "react-router-dom";
export default class EventComponent extends Component {
  state = {
    moment: moment()
  };
  componentDidMount = () => {
    const appMap = new OlMapFunction({
      projectionCode: "EPSG:3857",
      divId: "mapContainer2",
      zoom: 3,
      center: [0, 4813697]
    });
    const {
      match: { params }
    } = this.props;

    this.initializeEvent(params.eventId, this.initializeMap);
  };

  initializeMap = () => {
    const appMap = new OlMapFunction({
      projectionCode: "EPSG:3857",
      divId: "mapContainer2",
      zoom: 3,
      center: [0, 4813697]
    });
    const { location, title } = this.props.event.eventDetails;
    document.getElementById("marker").dataset.tooltip = title;
    appMap.addMarker(location.longitude, location.latitude, document.getElementById("marker"));
    appMap.centerMap(location.longitude, location.latitude);
  };

  initializeEvent = (eventId, initializeMap) => {
    this.props.onGetEvent(eventId, initializeMap);
  };

  handleJoinEvent = () => {
    const {
      match: { params }
    } = this.props;
    let userId = localStorage.getItem("userId");
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let userDetails = {
      userId,
      lastName,
      firstName
    };
    this.props.onJoinUserToEvent(userDetails, params.eventId);
  };

  cancelUserParticipation = () => {
    const {
      match: { params }
    } = this.props;
    let userId = localStorage.getItem("userId");
    this.props.onCancelUserParticipation(userId, params.eventId);
  };

  render() {
    const { isFetching, eventDetails, weather, isUserJoinedToEvent, calculateDistanceFailed } = this.props.event;
    return (
      <div>
        <div className="container-video">
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="overlay" />
        {!isFetching ? (
          <>
            <div className="event-section">
              <div className="title-section">
                <h1 className="title">{eventDetails.title}</h1>
                <p className="header">{eventDetails.description}</p>
                <p className="header">{isUserJoinedToEvent ? "You are attending this event" : null}</p>
                <div className="buttons">
                  {isUserJoinedToEvent ? (
                    <Button basic inverted size="big" onClick={this.cancelUserParticipation}>
                      Cancel participation
                    </Button>
                  ) : (
                    <Button basic inverted size="big" onClick={this.handleJoinEvent}>
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="event-description-section">
              <div className="event-description-section-container">
                <div className="event-description">
                  <div>
                    <div className="event_item-info-section">
                      <div className="event_item-info-section-label">
                        <i className="circle orange icon tiny" />
                        <span>Description:</span>
                      </div>
                      {eventDetails.description}
                    </div>
                    <div className="event_item-info-section">
                      <div className="event_item-info-section-label">
                        <i className="circle orange icon tiny" />
                        <span>Organizer:</span>
                      </div>
                      {eventDetails.organizer}
                    </div>
                    <div className="event_item-info-section">
                      <div className="event_item-info-section-label">
                        <i className="circle orange icon tiny" />
                        <span>Category:</span>
                      </div>
                      {eventDetails.category}
                    </div>
                  </div>
                </div>
                <Calendar
                  day={eventDetails.date.day}
                  month={eventDetails.date.month}
                  year={eventDetails.date.year}
                  time={eventDetails.date.entireDate.substring(eventDetails.date.entireDate.length - 8, eventDetails.date.entireDate.length)}
                />
              </div>
            </div>
            <div className="map-section">
              <div className="title">This event is placed in {eventDetails.location.title}</div>
              {!calculateDistanceFailed ? (
                <div className="subtitle">
                  The distance to {eventDetails.location.title} is {eventDetails.location.distance} Km
                </div>
              ) : (
                <div className="subtitle">Allow location to view the distance</div>
              )}
              <div id="mapContainer2" className="map">
                <div style={{ display: "none" }}>
                  <div id="marker" className="ui icon" data-position="top center">
                    <i className="map pin orange icon big" />
                  </div>
                </div>
              </div>
            </div>
            <div className="weather-section">
              <div className="title">
                The weather forecast for the {eventDetails.date.day} {eventDetails.date.month} {eventDetails.date.year}
              </div>
              {!weather.isMoreThanMaxDaysAllowed ? (
                !weather.isFetchingWeather ? (
                  !weather.weatherNotAllowed ? (
                    <>
                      <Weather weather={weather} />
                    </>
                  ) : (
                    <Message negative>
                      <Message.Header>
                        <div className="weather-not-allowed">Weather not allowed for this region</div>
                      </Message.Header>
                    </Message>
                  )
                ) : (
                  <Segment className="weather-not-allowed">
                    <Loader active inline="centered" />
                  </Segment>
                )
              ) : (
                <Message info>
                  <Message.Header>
                    <div className="weather-not-allowed">If the event is coming in less than 6 days you can see the weather for that date.</div>
                  </Message.Header>
                </Message>
              )}
            </div>
            <div className="participants-section">
              <div className="title">participants for this event</div>
              <div className="participants">
                {eventDetails.users !== undefined
                  ? Object.keys(eventDetails.users).map((key, index) => (
                      <Card key={index}>
                        <Card.Content>
                          <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
                          <Link to={`/users/${key}`}>
                            <Card.Header>
                              {eventDetails.users[key].firstName} {eventDetails.users[key].lastName}
                            </Card.Header>
                          </Link>

                          <Card.Meta>Friends of Elliot</Card.Meta>
                        </Card.Content>
                      </Card>
                    ))
                  : null}
              </div>
            </div>
          </>
        ) : (
          <div className="fetching-data">
            <Loader active inline="centered" />
          </div>
        )}
      </div>
    );
  }
}
