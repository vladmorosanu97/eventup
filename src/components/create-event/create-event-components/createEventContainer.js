import { connect } from "react-redux";
import CreateEventComponent from "./CreateEvent";
import { withRouter } from "react-router-dom";

import {
  getLocationOptions,
  updateFormState,
  removeSelectedLocation,
  saveEvent,
  resetFormState,
  getLocationCoordinates,
  updateSubmitButton,
  checkFromErrors,
  initializeFormFirebase,
  updateEvent
} from "../createEventActions";

const mapStateProps = state => ({
  createEvent: Object.assign({}, state.createEvent)
});

const mapDispatchToProps = dispatch => ({
  onGetLocationOptions: suggestion => {
    dispatch(getLocationOptions(suggestion));
  },

  onUpdateFormState: (propPath, payload) => {
    dispatch(updateFormState(propPath, payload));
    dispatch(checkFromErrors());
  },

  onClickSubmitButton: payload => {
    dispatch(updateSubmitButton(payload));
    dispatch(checkFromErrors());
  },

  onRemoveSelectedLocation: () => {
    dispatch(removeSelectedLocation());
  },

  onResetFormState: () => {
    dispatch(resetFormState());
  },

  onGetLocationCoordinates: (locationId, handleLocation) => {
    dispatch(getLocationCoordinates(locationId, handleLocation));
  },

  onSaveEvent: props => {
    const { title, organizer, description, location, date, category } = props;
    const payload = {
      userId: localStorage.getItem("userId"),
      title,
      organizer,
      description,
      location,
      date,
      category,
      users: []
    };
    dispatch(saveEvent(payload));
    dispatch(resetFormState());
  },
  onResetFormState: () => {
    dispatch(resetFormState());
  },

  onInitializeForm: (eventId, onSelectLocation) => {
    dispatch(initializeFormFirebase(eventId, onSelectLocation));
  },

  onUpdateEvent: (eventId, props) => {
    const { title, organizer, description, location, date, category } = props;
    const payload = {
      userId: localStorage.getItem("userId"),
      title,
      organizer,
      description,
      location,
      date,
      category,
      users: []
    };
    dispatch(updateEvent(eventId, payload));
    dispatch(resetFormState());
  }
});

const CreateEvent = withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps
  )(CreateEventComponent)
);

export default CreateEvent;
