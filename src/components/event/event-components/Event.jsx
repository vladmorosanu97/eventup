import React, { Component } from 'react';
import video from '../../../services/night.mp4';
import { Button, Card, Icon } from 'semantic-ui-react';
import { DatetimePicker } from 'rc-datetime-picker';
import moment from 'moment';
import Calendar from '../../shared/Calendar';
import OlMapFunction from '../../../services/map/OlMap';
import Weather from './Weather';
export default class EventComponent extends Component {
  state = {
    moment: moment()
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.initializeEvent(params.eventId, this.initializeMap);
    const appMap = new OlMapFunction({
      projectionCode: 'EPSG:3857',
      divId: 'mapContainer',
      zoom: 3,
      center: [0, 4813697]
    });
    this.appMap = appMap;
  }

  initializeMap = () => {
    const { location, title } = this.props.event.eventDetails;
    // document.getElementById('marker').dataset.tooltip = title;
    this.appMap.addMarker(
      location.longitude,
      location.latitude,
      document.getElementById('marker')
    );
    this.appMap.centerMap(location.longitude, location.latitude);
  };

  initializeEvent = (eventId, initializeMap) => {
    this.props.onGetEvent(eventId, initializeMap);
  };

  render() {
    const { isFetching, eventDetails, weather } = this.props.event;
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
            <h1 className="title">{eventDetails.title}</h1>
            <p className="header">{eventDetails.description}</p>
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
              time={eventDetails.date.entireDate.substring(
                eventDetails.date.entireDate.length - 8,
                eventDetails.date.entireDate.length
              )}
            />
          </div>
        </div>
        <div className="map-section">
          <div className="title">
            This event is placed in {eventDetails.location.title}
          </div>
          <div id="mapContainer" className="map">
            <div style={{ display: 'none' }}>
              <div id="marker" className="ui icon" data-position="top center">
                <i className="map pin orange icon big" />
              </div>
            </div>
          </div>
        </div>
        <div className="weather-section">
          <div className="title">
            The weather forecast for the {eventDetails.date.day}{' '}
            {eventDetails.date.month}
          </div>
          <Weather weather={weather} />
        </div>
        className={`ui ${isFetching ? 'active' : 'disabled'} inverted dimmer`}
        >
        <div className="ui medium loader" />
      </div>
    );
  }
}
