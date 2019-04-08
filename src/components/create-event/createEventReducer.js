import { actionTypes } from "./createEventActions";
import { categoryOptions } from "../../utils/utils";

export default function createEventReducer(
  state = {
    isFetching: false,
    isFetchingSearch: false,
    isFetchingLocationCoordinates: false,
    isSubmitDirty: false,
    formState: {
      title: "",
      organizer: "",
      description: "",
      location: {
        id: "",
        title: "",
        latitude: "",
        longitude: ""
      },
      date: {
        day: "",
        month: "",
        entireDate: ""
      },
      category: ""
    },
    formErrors: {
      title: false,
      organizer: false,
      description: false,
      location: false,
      date: false,
      category: false
    },
    locationOptions: [],
    categoryOptions: categoryOptions,
    eventList: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.RESET_FORM_STATE:
      return {
        ...state,
        formState: {
          title: "",
          organizer: "",
          description: "",
          location: {
            id: "",
            title: ""
          },
          date: {
            day: "",
            month: "",
            entireDate: ""
          },
          category: ""
        },
        locationOptions: []
      };
    case actionTypes.REQUEST_LOCATION_OPTIONS:
      return {
        ...state,
        isFetchingSearch: true
      };
    case actionTypes.RECEIVE_LOCATION_OPTIONS:
      const locationOptions = action.data.suggestions.map(item => {
        return {
          id: item.locationId,
          title: item.label
        };
      });
      return {
        ...state,
        isFetchingSearch: false,
        locationOptions: locationOptions
      };
    case actionTypes.REQUEST_SAVE_EVENT:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_SAVE_EVENT:
      return {
        ...state,
        isFetching: false
      };
    case actionTypes.UPDATE_FORM_STATE:
      return {
        ...state,
        formState: {
          ...state.formState,
          [action.propPath]: action.data
        }
      };
    case actionTypes.CHECK_FORM_ERRORS:
      return {
        ...state,
        formErrors: {
          title: state.formState.title === "",
          organizer: state.formState.organizer === "",
          description: state.formState.description === "",
          location: state.formState.location.title === "",
          date: state.formState.date.day === "",
          category: state.formState.category === ""
        }
      };
    case actionTypes.REMOVE_SELECTED_LOCATION:
      return {
        ...state,
        formState: {
          ...state.formState,
          location: {
            id: "",
            title: ""
          }
        }
      };
    case actionTypes.REQUEST_LOCATION_COORDINATES:
      return {
        ...state,
        isFetchingLocationCoordinates: true
      };
    case actionTypes.RECEIVE_LOCATION_COORDINATES:
      return {
        ...state,
        isFetchingLocationCoordinates: false,
        formState: {
          ...state.formState,
          location: {
            ...state.formState.location,
            latitude: action.data.latitude,
            longitude: action.data.longitude
          }
        }
      };

    case actionTypes.UPDATE_SUBMIT_BUTTON:
      return {
        ...state,
        isSubmitDirty: action.data
      };

    default:
      return state;
  }
}
