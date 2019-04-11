import { categoryOptions } from "../../utils/utils";
import { actionTypes } from "./eventActions";

var initialState = {
  isFetching: false,
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
    category: ""
  },
  weather: {
    isFetchingWeather: false,
    day: {
      icon: "18",
      iconPhrase: "Rain"
    },
    night: {
      icon: "30",
      iconPhrase: "Ceva"
    },
    temperature: {
      maximum: {
        value: "20",
        unit: "F"
      },
      minimum: {
        value: "20",
        unit: "F"
      }
    }
  }
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

    case actionTypes.REQUEST_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isFetchingWeather: true
        }
      };
    case actionTypes.RECEIVE_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          isFetchingWeather: false,
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
    default:
      return state;
  }
}
