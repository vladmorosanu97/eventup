import { connect } from "react-redux";
import CreateEventComponent from "./CreateEvent";

import {
  getLocationOptions,
  updateFormState,
  removeSelectedLocation,
  saveEvent,
  resetFormState
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
  },
  onRemoveSelectedLocation: () => {
    dispatch(removeSelectedLocation());
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
  },
  onResetFormState: () => {
    dispatch(resetFormState());
  }
});

const CreateEvent = connect(
  mapStateProps,
  mapDispatchToProps
)(CreateEventComponent);

export default CreateEvent;
