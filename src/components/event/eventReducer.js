import { actionTypes } from "./eventActions";

var initialState = {
  isFetching: false,
  isFetchingJoinUserToEvent: false,
  isFetchingCancelUserParticipation: false,
  eventDetails: {
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
    category: "",
    users: []
  },
  weather: {
    isFetchingWeather: false,
    isMoreThanMaxDaysAllowed: false,
    weatherNotAllowed: false,
    day: {
      icon: "",
      iconPhrase: ""
    },
    night: {
      icon: "",
      iconPhrase: ""
    },
    temperature: {
      maximum: {
        value: "",
        unit: ""
      },
      minimum: {
        value: "",
        unit: ""
      }
    }
  },
  isUserJoinedToEvent: false,
  calculateDistanceFailed: false
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_EVENT:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.RECEIVE_EVENT:
      return {
        ...state,
        isFetching: false,
        eventDetails: {
          ...action.data.event
        }
      };

    case actionTypes.REQUEST_JOIN_USER_TO_EVENT:
      return {
        ...state,
        isFetchingJoinUserToEvent: true
      };

    case actionTypes.RECEIVE_JOIN_USER_TO_EVENT:
      return {
        ...state,
        isFetchingJoinUserToEvent: false,
        isUserJoinedToEvent: true
      };

    case actionTypes.REQUEST_CANCEL_USER_PARTICIPATION:
      return {
        ...state,
        isFetchingCancelUserParticipation: true
      };

    case actionTypes.RECEIVE_CANCEL_USER_PARTICIPATION:
      return {
        ...state,
        isFetchingCancelUserParticipation: false,
        isUserJoinedToEvent: false
      };

    case actionTypes.REQUEST_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isMoreThanMaxDaysAllowed: false,
          isFetchingWeather: true,
          weatherNotAllowed: false
        }
      };

    case actionTypes.RECEIVE_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isMoreThanMaxDaysAllowed: false,
          isFetchingWeather: false,
          weatherNotAllowed: false,
          day: {
            icon: action.data.Day.Icon,
            iconPhrase: action.data.Day.IconPhrase
          },
          night: {
            icon: action.data.Night.Icon,
            iconPhrase: action.data.Night.IconPhrase
          },
          temperature: {
            maximum: {
              value: action.data.Temperature.Maximum.Value,
              unit: action.data.Temperature.Maximum.Unit
            },
            minimum: {
              value: action.data.Temperature.Minimum.Value,
              unit: action.data.Temperature.Minimum.Unit
            }
          }
        }
      };
    case actionTypes.SET_WEATHER_NOT_ALLOWED:
      return {
        ...state,
        weather: {
          ...state.weather,
          isMoreThanMaxDaysAllowed: false,
          isFetchingWeather: false,
          weatherNotAllowed: true
        }
      };
    case actionTypes.SET_DATE_DIFFERENCE_MORE_THAN_MAX_ALLOWED:
      return {
        ...state,
        weather: {
          ...state.weather,
          isMoreThanMaxDaysAllowed: true
        }
      };

    case actionTypes.IS_USES_JOINED_TO_EVENT:
      return {
        ...state,
        isUserJoinedToEvent:
          state.eventDetails.users !== undefined &&
          state.eventDetails.users[action.data] !== undefined
      };

    case actionTypes.CALCULATE_DISTANCES_EVENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        eventDetails: action.data,
        calculateDistanceFailed: false
      };
    case actionTypes.CALCULATE_DISTANCES_EVENT_FAILED:
      return {
        ...state,
        calculateDistanceFailed: true
      };
    default:
      return state;
  }
}
