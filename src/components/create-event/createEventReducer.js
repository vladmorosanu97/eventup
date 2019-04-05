import { actionTypes } from "./createEventActions";
import { categoryOptions } from "../../utils/utils";

export default function homeReducer(
  state = {
    isFetching: false,
    isFetchingSearch: false,
    isFetchingLocationCoordinates: false,
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

    default:
      return state;
  }
}
