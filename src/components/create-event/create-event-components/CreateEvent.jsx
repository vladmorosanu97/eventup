import React, { Component } from 'react';
import { Transition, Icon, Search, Select } from 'semantic-ui-react';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';
export default class CreateEvent extends Component {
  state = {
    suggestionForLocation: '',
    moment: moment(),
    activeIndex: -1
  };

  handleUpdateFormState = (ev, data) => {
    this.props.onUpdateFormState(data.name, data.result);
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
    this.props.onSaveEvent(this.props.home.formState);
    this.onClickBackToEventList();
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
      <Transition
        // visible={this.state.createEventVisible}
        animation="fade left"
        duration={500}
        // onComplete={
        //   this.state.createEventVisible ? null : this.onCompleteBackToEventList
        // }
      >
        <div className="home__container-dashboard">
          <div className="location-label">
            <Icon name="asterisk" color="red" size="tiny" />
            <p>Add a location:</p>
          </div>
          <Search
            fluid
            name="location"
            placeholder="Search ..."
            loading={isFetchingSearch}
            onResultSelect={(ev, data) => this.handleUpdateFormState(ev, data)}
            onSearchChange={(ev, data) => this.handleLocationInput(ev, data)}
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
          <div className="category-label">
            <Icon name="asterisk" color="red" size="tiny" />
            <p>Category:</p>
          </div>

          <Select
            name="category"
            className="category-select"
            placeholder="Choose a category for your event"
            options={categoryOptions}
            onChange={(ev, data) => this.handleCategoryChange(ev, data)}
          />

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
    );
  }
}
