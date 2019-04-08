import React, { Component } from 'react';
import { Transition, Icon, Search, Select } from 'semantic-ui-react';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';
import { ReactComponent as AddEventImage } from '../../../assets/images/undraw_browser_stats_704t.svg';
import OlMapFunction from '../../../services/map/OlMap';

export default class CreateEventComponent extends Component {
  state = {
    suggestionForLocation: '',
    moment: moment(),
    activeIndex: -1
  };

  componentDidMount = () => {
    const appMap = new OlMapFunction({
      projectionCode: 'EPSG:3857',
      divId: 'mapContainer',
      zoom: 12,
      center: [3069846.933198887, 5968162.614045765]
    });
    this.appMap = appMap;
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos.coords);
      appMap.centerMap(pos.coords.longitude, pos.coords.latitude);
    });
  };

  handleUpdateFormState = (ev, data) => {
    console.log('aici');
    this.props.onUpdateFormState(data.name, data.result);
    console.log(
      this.props.onGetLocationCoordinates(data.result.id, this.onSelectLocation)
    );

    // this.onSelectLocation(
    //   this.props.formState.location.longitude,
    //   this.props.formState.location.latitude,
    //   this.props.formState.location.title
    // );
  };

  onSelectLocation = (longitude, latitude, title) => {
    document.getElementById('marker').dataset.tooltip = title;
    this.appMap.addMarker(
      longitude,
      latitude,
      document.getElementById('marker')
    );
    this.appMap.centerMap(longitude, latitude);
  };

  removeSelectedLocation = () => {
    this.setState(
      {
        suggestionForLocation: ''
      },
      () => {
        this.props.onRemoveSelectedLocation();
      }
    );
  };

  handleCategoryChange = (ev, data) => {
    this.props.onUpdateFormState(data.name, data.value);
  };

  handleSaveEvent = () => {
    console.log(this.props.createEvent.formState);
    this.props.onSaveEvent(this.props.createEvent.formState);
    this.onClickBackToHomePage();
  };

  onClickBackToHomePage = () => {
    this.props.history.push('/home');
  };

  handleDateChange = moment => {
    this.setState(
      {
        moment
      },
      () => {
        const payload = {
          day: moment.format('DD'),
          month: moment.format('MMM').toUpperCase(),
          entireDate: moment.format('LLLL')
        };
        this.props.onUpdateFormState('date', payload);
      }
    );
  };

  handleLocationInput = (ev, data) => {
    this.setState({ suggestionForLocation: data.value }, () => {
      if (data.value !== '') {
        console.log(data.value);
        this.props.onGetLocationOptions(data.value);
      }
    });
  };

  handleInputChange = ev => {
    // Update form elements
    const propPath = ev.target.name;
    const payload = ev.target.value;
    this.props.onUpdateFormState(propPath, payload);
  };

  checkIfCanSave = () => {
    const {
      title,
      organizer,
      description,
      location,
      date,
      category
    } = this.props.createEvent.formState;
    return (
      title !== '' &&
      organizer !== '' &&
      description !== '' &&
      location.title !== '' &&
      date !== '' &&
      category !== ''
    );
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Tomorrow: moment().add(1, 'days')
    };
    const {
      isFetchingSearch,
      locationOptions,
      categoryOptions,
      formState
    } = this.props.createEvent;
    return (
      <>
        <div className="new-event-section">
          <div className="form-section">
            <Transition
              // visible={this.state.createEventVisible}
              animation="fade left"
              duration={500}
              // onComplete={
              //   this.state.createEventVisible ? null : this.onCompleteBackToEventList
              // }
            >
              <div className="home__container-dashboard">
                <div className="event_info">
                  <div className="event_info-title">
                    <div className="event-name-label">
                      <Icon name="asterisk" color="red" size="tiny" />
                      <p>Event name:</p>
                    </div>
                    <div className="ui input">
                      <input
                        type="text"
                        name="title"
                        value={formState.title}
                        placeholder="E.g. Party of the Year"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="event_info-organizer">
                    <div className="event-organizer-label">
                      <Icon name="asterisk" color="red" size="tiny" />
                      <p>Organised by:</p>
                    </div>
                    <div className="ui input">
                      <input
                        type="text"
                        name="organizer"
                        value={formState.organizer}
                        placeholder="E.g. The Event Organiser"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="description-label">
                  <Icon name="asterisk" color="red" size="tiny" />
                  <p>Description:</p>
                </div>
                <div className="ui form">
                  <div className="field">
                    <textarea
                      rows="3"
                      name="description"
                      value={formState.description}
                      onChange={this.handleInputChange}
                      className="description-field"
                    />
                  </div>
                </div>
                <div className="full-width display-flex ">
                  <div className="half-width">
                    <div className="event_date">
                      <div className="date-label">
                        <Icon name="asterisk" color="red" size="tiny" />
                        <p>Starts at:</p>
                      </div>
                      <DatetimePickerTrigger
                        shortcuts={shortcuts}
                        moment={this.state.moment}
                        closeOnSelectDay={true}
                        onChange={this.handleDateChange}
                      >
                        <div className="ui action input">
                          <input
                            type="text"
                            name="date"
                            value={this.state.moment.format('lll')}
                            readOnly
                          />
                          <button className="ui icon button">
                            <i className="search icon" />
                          </button>
                        </div>
                      </DatetimePickerTrigger>
                    </div>
                    <div className="category-label">
                      <Icon name="asterisk" color="red" size="tiny" />
                      <p>Category:</p>
                      <Select
                        name="category"
                        className="category-select"
                        placeholder="Choose a category for your event"
                        options={categoryOptions}
                        onChange={(ev, data) =>
                          this.handleCategoryChange(ev, data)
                        }
                      />
                    </div>
                  </div>
                  <div className="image-section">
                    <AddEventImage width="250" height="250" />
                  </div>
                </div>

                <div className="location-label">
                  <Icon name="asterisk" color="red" size="tiny" />
                  <p>Add a location:</p>
                </div>
                <Search
                  fluid
                  name="location"
                  placeholder="Search ..."
                  loading={isFetchingSearch}
                  onResultSelect={(ev, data) =>
                    this.handleUpdateFormState(ev, data)
                  }
                  onSearchChange={(ev, data) =>
                    this.handleLocationInput(ev, data)
                  }
                  results={locationOptions}
                  value={this.state.suggestionForLocation}
                  className="location-field"
                />
                {formState.location.title !== '' ? (
                  <div className="selected-location">
                    <div className="ui image label large">
                      <Icon name="map marker alternate" color="orange" />
                      {formState.location.title}
                      <i
                        className="delete icon"
                        onClick={this.removeSelectedLocation}
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <div className="new-event-map-section">
                  <div id="mapContainer" className="new-event-map">
                    <div style={{ display: 'none' }}>
                      <div
                        id="marker"
                        className="ui icon"
                        data-position="top center"
                      >
                        <i className="map pin orange icon big" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="event-actions">
                  <div className="ui buttons">
                    <button
                      className="ui button"
                      onClick={this.onClickBackToEventList}
                    >
                      Cancel
                    </button>
                    <div className="or" />
                    <button
                      className={`ui positive button ${
                        this.checkIfCanSave() ? '' : 'disabled'
                      }`}
                      onClick={this.handleSaveEvent}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  }
}
