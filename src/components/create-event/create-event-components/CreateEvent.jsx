import React, { Component } from "react";
import moment from "moment";
import { ReactComponent as AddEventImage } from "../../../assets/images/undraw_browser_stats_704t.svg";
import OlMapFunction from "../../../services/map/OlMap";
import InputForm from "../../shared/InputForm";
import TextareaForm from "../../shared/TextareaForm";
import SelectForm from "../../shared/SelectForm";
import LocationForm from "./LocationForm";
import DatePickerForm from "./DatePickerForm";

export default class CreateEventComponent extends Component {
  state = {
    suggestionForLocation: "",
    moment: moment(),
    activeIndex: -1
  };

  componentDidMount = () => {
    this.props.onResetFormState();
    const appMap = new OlMapFunction({
      projectionCode: "EPSG:3857",
      divId: "mapContainer",
      zoom: 12,
      center: [3069846.933198887, 5968162.614045765]
    });
    this.appMap = appMap;
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos.coords);
      appMap.centerMap(pos.coords.longitude, pos.coords.latitude);
    });

    const {
      match: { params }
    } = this.props;

    if (params.eventId != undefined) {
      this.initializeForm(params.eventId, this.onSelectLocation);
    }
  };

  initializeForm(eventId, onSelectLocation) {
    this.props.onInitializeForm(eventId, onSelectLocation);
  }

  handleUpdateFormState = (ev, data) => {
    this.props.onUpdateFormState(data.name, data.result);
    this.props.onGetLocationCoordinates(data.result.id, this.onSelectLocation);
  };

  onSelectLocation = (longitude, latitude, title) => {
    document.getElementById("marker").dataset.tooltip = title;
    this.appMap.addMarker(longitude, latitude, document.getElementById("marker"));
    this.appMap.centerMap(longitude, latitude);
  };

  removeSelectedLocation = () => {
    this.setState(
      {
        suggestionForLocation: ""
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
    const {
      match: { params }
    } = this.props;

    if (this.checkIfCanSave()) {
      if (params.eventId != undefined) {
        this.props.onUpdateEvent(params.eventId, this.props.createEvent.formState);
        this.onClickBackToHomePage();
      } else {
        this.props.onSaveEvent(this.props.createEvent.formState);
        this.onClickBackToHomePage();
      }
    } else {
      this.props.onClickSubmitButton(true);
    }
  };

  onClickBackToHomePage = () => {
    this.props.history.push("/home");
  };

  onClickBackToEventList = () => {
    this.props.history.push("/home");
  };

  handleDateChange = moment => {
    this.setState(
      {
        moment
      },
      () => {
        const payload = {
          day: moment.format("DD"),
          month: moment.format("MMMM"),
          year:
            moment
              .format("YYYY")
              .charAt(0)
              .toUpperCase() + moment.format("YYYY").slice(1),
          entireDate: moment.format("LLLL")
        };
        this.props.onUpdateFormState("date", payload);
      }
    );
  };

  handleLocationInput = (ev, data) => {
    this.setState({ suggestionForLocation: data.value }, () => {
      if (data.value !== "") {
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
    const { title, organizer, description, location, date, category } = this.props.createEvent.formState;
    return title !== "" && organizer !== "" && description !== "" && location.title !== "" && date.day !== "" && category !== "";
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Tomorrow: moment().add(1, "days")
    };
    const { isFetchingSearch, locationOptions, categoryOptions, formState, formErrors, isSubmitDirty } = this.props.createEvent;
    return (
      <div className="new-event-section">
        <div className="form-section">
          <div className="event_info">
            <InputForm
              name="title"
              value={formState.title}
              handleInputChange={this.handleInputChange}
              hasError={formErrors.title && isSubmitDirty}
              placeholder="E.g. Party of the Year"
              label="Event name"
            />
            <InputForm
              name="organizer"
              value={formState.organizer}
              handleInputChange={this.handleInputChange}
              hasError={formErrors.organizer && isSubmitDirty}
              placeholder="E.g. The Event Organizer"
              label="Organized by"
            />
          </div>
          <TextareaForm
            name="description"
            value={formState.description}
            handleInputChange={this.handleInputChange}
            hasError={formErrors.description && isSubmitDirty}
            label="Description"
          />

          <div className="event_info">
            <div className="half-width">
              <DatePickerForm
                name="date"
                shortcuts={shortcuts}
                moment={this.state.moment}
                closeOnSelectDay={true}
                handleDateChange={this.handleDateChange}
                hasError={formErrors.date && isSubmitDirty}
                label="Starts at"
              />
              <SelectForm
                name="category"
                className="category-select"
                placeholder="Choose a category for your event"
                categoryOptions={categoryOptions}
                handleCategoryChange={this.handleCategoryChange}
                hasError={formErrors.category && isSubmitDirty}
                label="Category"
                category={formState.category}
              />
            </div>
            <div className="image-section margin-top-10">
              <AddEventImage width="200" height="200" />
            </div>
          </div>

          <LocationForm
            name="location"
            placeholder="Search ..."
            isFetchingSearch={isFetchingSearch}
            handleUpdateFormState={this.handleUpdateFormState}
            handleLocationInput={this.handleLocationInput}
            locationOptions={locationOptions}
            suggestionForLocation={this.state.suggestionForLocation}
            removeSelectedLocation={this.removeSelectedLocation}
            location={formState.location}
            hasError={formErrors.location && isSubmitDirty}
            label="Add a location"
          />

          <div className="new-event-map-section">
            <div id="mapContainer" className="new-event-map">
              <div style={{ display: "none" }}>
                <div id="marker" className="ui icon" data-position="top center">
                  <i className="map pin orange icon big" />
                </div>
              </div>
            </div>
          </div>
          <div className="event-actions">
            <div className="ui buttons">
              <button className="ui button" onClick={this.onClickBackToEventList}>
                Cancel
              </button>
              <div className="or" />
              <button className={`ui positive button`} onClick={this.handleSaveEvent}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
