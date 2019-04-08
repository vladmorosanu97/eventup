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
  checkFromErrors
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
      category
    };
    dispatch(saveEvent(payload));
    dispatch(resetFormState());
  },
  onResetFormState: () => {
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
