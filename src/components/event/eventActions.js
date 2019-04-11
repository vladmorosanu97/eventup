import firebaseProvider from "../../config/FireConfig";
import {
  weatherAutocompleteHost,
  apiKey,
  weatherHost
} from "../../services/weather/weatherService";

export const actionTypes = {
  REQUEST_EVENT: "REQUEST_EVENT",
  RECEIVE_EVENT: "RECEIVE_EVENT",
  REQUEST_WEATHER: "REQUEST_WEATHER",
  RECEIVE_WEATHER: "RECEIVE_WEATHER"
};

export const requestEvent = () => {
  return {
    type: actionTypes.REQUEST_EVENT
  };
};

export const receiveEvent = data => {
  return {
    type: actionTypes.RECEIVE_EVENT,
    data: data
  };
};

export const requestWeather = () => {
  return {
    type: actionTypes.REQUEST_WEATHER
  };
};

export const receiveWeather = data => {
  return {
    type: actionTypes.RECEIVE_WEATHER,
    data: data
  };
};

export const getEvent = (eventId, initializeMap) => {
  return dispatch => {
    dispatch(requestEvent());

    fetchEventFirebase(eventId).then(rsp => {
      dispatch(receiveEvent(rsp));
      initializeMap();

      var date1 = new Date();
      date1.setHours(0, 0, 0, 0);
      var date2 = new Date(rsp.event.date.entireDate);
      var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

      if (diffDays < 5 && diffDays > 0) {
        dispatch(requestWeather());
        dispatch(getWeatherApi(rsp.event.location.title, diffDays));
      }
    });
  };
};

export const fetchEventFirebase = eventId => {
  let payload = {
    event: {}
  };
  return firebaseProvider
    .database()
    .ref(`events/${eventId}`)
    .once("value", snapshot => {
      console.log(snapshot.val());
      if (snapshot.val() !== null) {
        payload["event"] = snapshot.val();
      }
    })
    .then(() => {
      return payload;
    });
};

export const getWeatherApi = (location, diffDays) => {
  return dispatch => {
    fetchWeatherLocationKey(
      location.split(" ")[location.split(" ").length - 1]
    ).then(data => {
      fetchWeatherApi(data[0].Key).then(resp => {
        let data = resp.DailyForecasts[diffDays];
        console.log(data);
        dispatch(receiveWeather(data));
      });
    });
  };
};

export const fetchWeatherLocationKey = location => {
  return fetch(
    `${weatherAutocompleteHost}\apikey=${apiKey}&q=${location}`
  ).then(resp => {
    return resp.json();
  });
};

export const fetchWeatherApi = locationKey => {
  return fetch(`${weatherHost}\\${locationKey}?apikey=${apiKey}`).then(resp => {
    return resp.json();
  });
};
