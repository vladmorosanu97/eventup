import React, { Component } from "react";
import OlMapFunction from "../../../services/map/OlMap";
import EventItem from "../../shared/EventItem";
import { Search, Input } from "semantic-ui-react";
import { ReactComponent as NotFoundImage } from "../../../assets/images/undraw_empty_xct9.svg";

class HomeComponent extends Component {
  state = {};

  componentDidMount = () => {
    const appMap = new OlMapFunction({
      projectionCode: "EPSG:3857",
      divId: "mapContainer",
      zoom: 3,
      center: [0, 4813697]
    });
    this.appMap = appMap;
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
    this.appMap.addMarker(
      location.longitude,
      location.latitude,
      document.getElementById("marker")
    );
    this.appMap.centerMap(location.longitude, location.latitude);
  };

  handleSearchChange = (e, { value }) => {
    console.log(value);
    this.props.onSearchEvent(value);
    // this.setState({ isLoading: true, value });
  };

  render() {
    const {
      isFetching,
      filteredEventList,
      calculateDistanceFailed
    } = this.props.home;
    const { value } = this.state;

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
            <div className="home__container-title">Search events</div>
            <div className="home__container-buttons">
              <Input
                icon="search"
                placeholder="Search..."
                onChange={this.handleSearchChange}
              />
            </div>
          </div>
          <div className="home__container-dashboard">
            {!isFetching
              ? filteredEventList.map((item, index) => (
                  <EventItem
                    key={index}
                    event={item}
                    className={this.state.activeIndex === index ? "active" : ""}
                    onClickEvent={() => this.onClickEvent(item, index)}
                    calculateDistanceFailed={calculateDistanceFailed}
                  />
                ))
              : ""}
            {filteredEventList.length == 0 && !isFetching ? (
              <div className="not-found-section">
                <div className="text-left">There are no events</div>
                <NotFoundImage width="300" height="300" />
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            className={`ui ${
              isFetching ? "active" : "disabled"
            } inverted dimmer`}
          >
            <div className="ui medium loader" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
