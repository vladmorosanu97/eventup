import React, { Component } from "react";
import OlMapFunction from "../../../services/map/OlMap";
import EventItem from "../../shared/EventItem";
import { Input, Label, Button, Checkbox } from "semantic-ui-react";
import { ReactComponent as NotFoundImage } from "../../../assets/images/undraw_empty_xct9.svg";
import { Slider } from "react-semantic-ui-range";
class HomeComponent extends Component {
  state = {
    value: 100,
    max: 200,
    min: 0,
    maxDistance: 100,
    minDistance: 0,
    checkedIncomingEvents: false
  };

  componentDidMount = () => {
    const appMap = new OlMapFunction({
      projectionCode: "EPSG:3857",
      divId: "mapContainer",
      zoom: 5,
      center: [3069846.933198887, 5968162.614045765]
    });
    this.appMap = appMap;
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.appMap.centerMap(pos.coords.longitude, pos.coords.latitude);
      },
      error => {
        console.error("Unable to center the map");
      }
    );
    this.initializeEventList();
  };

  initializeEventList = () => {
    this.props.onGetEventList();
  };

  onClickEvent = (event, index) => {
    const { location } = event;
    this.setState({
      activeIndex: index
    });
    document.getElementById("marker").dataset.tooltip = event.title;
    this.appMap.addMarker(location.longitude, location.latitude, document.getElementById("marker"));
    this.appMap.centerMap(location.longitude, location.latitude);
  };

  handleSearchChange = (e, { value }) => {
    this.props.onSearchEvent(value);
  };

  handleSliderMinValue = event => {
    this.setState({
      min: Number.parseInt(event.target.value)
    });
  };

  handleSliderMaxValue = event => {
    this.setState({
      max: Number.parseInt(event.target.value)
    });
  };

  handleOnClickMaxDistance = value => {
    this.setState(prev => {
      return {
        maxDistance: prev.value,
        minDistance: prev.min
      };
    });
  };

  handleOnChangeCheckbox = event => {
    this.setState(prevState => {
      return {
        checkedIncomingEvents: !prevState.checkedIncomingEvents
      };
    });
    event.target.checked = !event.target.checked;
  };

  render() {
    const { isFetching, filteredEventList, calculateDistanceFailed } = this.props.home;
    return (
      <div className="home__container">
        <div id="mapContainer" className="home__container-map">
          <div style={{ display: "none" }}>
            <div id="marker" className="ui icon" data-position="top center">
              <i className="map pin orange icon big" />
            </div>
          </div>
        </div>
        <div className="home__container-details">
          <div className="home__container-actions">
            <div className="search-events">
              <div className="search-events-title">Search by name</div>
              <div className="search-events-buttons">
                <Input icon="search" placeholder="Search..." onChange={this.handleSearchChange} />
              </div>
            </div>

            <div className="search-events margin-top-20">
              <div className="search-events-title">Search by distance</div>
              <div className="search-events-buttons">
                <div className="slider-section display-flex">
                  <div className="ui disabled input min-input">
                    <input type="number" disabled onChange={this.handleSliderMinValue} value={this.state.min} />
                  </div>
                  <div className="slider">
                    <Slider
                      color="red"
                      inverted={false}
                      settings={{
                        start: this.state.value,
                        min: this.state.min,
                        max: this.state.max,
                        step: 1,
                        onChange: value => {
                          this.setState({
                            value: value
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="ui input max-input">
                    <input value={this.state.max} onChange={this.handleSliderMaxValue} type="number" />
                  </div>
                </div>
              </div>
            </div>
            <div className="checkbox-section">
              <div className="checkbox-section-buttons">
                <Checkbox checked={this.state.checkedIncomingEvents} onClick={this.handleOnChangeCheckbox} label="Only future events" />
              </div>

              <div className="checkbox-section-submit display-flex align-center">
                <div className="margin-right-10 margin-left-20">
                  <Label color="red" className="margin-right-10">
                    {"Distance range: 0-" + this.state.value + " Km"}
                  </Label>
                </div>

                <Button size="small" onClick={this.handleOnClickMaxDistance}>
                  Search events
                </Button>
              </div>
            </div>
          </div>
          <div className="home__container-dashboard">
            {!isFetching && !calculateDistanceFailed
              ? filteredEventList
                  .filter(item =>
                    !this.state.checkedIncomingEvents
                      ? item.location.distance <= this.state.maxDistance && item.location.distance >= this.state.minDistance
                      : item.location.distance <= this.state.maxDistance &&
                        item.location.distance >= this.state.minDistance &&
                        new Date(item.date.entireDate) > new Date()
                  )
                  .sort((a, b) => (a.location.distance > b.location.distance ? 1 : -1))
                  .map((item, index) => (
                    <EventItem
                      key={index}
                      event={item}
                      className={this.state.activeIndex === index ? "active" : ""}
                      onClickEvent={() => this.onClickEvent(item, index)}
                      calculateDistanceFailed={calculateDistanceFailed}
                    />
                  ))
              : null}
            {!isFetching && calculateDistanceFailed
              ? filteredEventList
                  .filter(item => (this.state.checkedIncomingEvents ? new Date(item.date.entireDate) > new Date() : item))
                  .sort((a, b) => (new Date(a.date.entireDate) > new Date(b.date.entireDate) ? -1 : 1))
                  .map((item, index) => (
                    <EventItem
                      key={index}
                      event={item}
                      className={this.state.activeIndex === index ? "active" : ""}
                      onClickEvent={() => this.onClickEvent(item, index)}
                      calculateDistanceFailed={calculateDistanceFailed}
                    />
                  ))
              : null}
            {(filteredEventList.length === 0 && !isFetching) ||
            (filteredEventList.filter(item =>
              !this.state.checkedIncomingEvents
                ? item.location.distance <= this.state.maxDistance && item.location.distance >= this.state.minDistance
                : item.location.distance <= this.state.maxDistance &&
                  item.location.distance >= this.state.minDistance &&
                  new Date(item.date.entireDate) > new Date()
            ).length === 0 &&
              !isFetching) ? (
              <div className="not-found-section">
                <div className="text-left text-message ">No events found</div>
                <NotFoundImage width="300" height="300" />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={`ui ${isFetching ? "active" : "disabled"} inverted dimmer`}>
            <div className="ui medium loader" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
