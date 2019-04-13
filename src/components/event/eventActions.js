import firebaseProvider from "../../config/FireConfig";
import {
  weatherAutocompleteHost,
  apiKey,
  weatherHost
} from "../../services/weather/weatherService";

export const actionTypes = {
  REQUEST_EVENT: "REQUEST_EVENT",
  RECEIVE_EVENT: "RECEIVE_EVENT",
  REQUEST_JOIN_USER_TO_EVENT: "REQUEST_JOIN_USER_TO_EVENT",
  RECEIVE_JOIN_USER_TO_EVENT: "RECEIVE_JOIN_USER_TO_EVENT",
  REQUEST_CANCEL_USER_PARTICIPATION: "REQUEST_CANCEL_USER_PARTICIPATION",
  RECEIVE_CANCEL_USER_PARTICIPATION: "RECEIVE_CANCEL_USER_PARTICIPATION",
  REQUEST_WEATHER: "REQUEST_WEATHER",
  RECEIVE_WEATHER: "RECEIVE_WEATHER",
  IS_USES_JOINED_TO_EVENT: "IS_USES_JOINED_TO_EVENT",
  SET_DATE_DIFFERENCE_MORE_THAN_MAX_ALLOWED:
    "SET_DATE_DIFFERENCE_MORE_THAN_MAX_ALLOWED",
  SET_WEATHER_NOT_ALLOWED: "SET_WEATHER_NOT_ALLOWED"
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

export const requestJoinUserToEvent = () => {
  return {
    type: actionTypes.REQUEST_JOIN_USER_TO_EVENT
  };
};

export const receiveJoinUserToEvent = () => {
  return {
    type: actionTypes.RECEIVE_JOIN_USER_TO_EVENT
  };
};

export const requestCancelUserParticipation = () => {
  return {
    type: actionTypes.REQUEST_CANCEL_USER_PARTICIPATION
  };
};

export const receiveCancelUserParticipation = () => {
  return {
    type: actionTypes.RECEIVE_CANCEL_USER_PARTICIPATION
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

export const setWeatherNotAllowed = () => {
  return {
    type: actionTypes.SET_WEATHER_NOT_ALLOWED
  };
};

export const setDateDifferenceMoreThanMaxAllowed = () => {
  return {
    type: actionTypes.SET_DATE_DIFFERENCE_MORE_THAN_MAX_ALLOWED
  };
};

export const isUserJoinedToEvent = userId => {
  return {
    type: actionTypes.IS_USES_JOINED_TO_EVENT,
    data: userId
  };
};

export const receiveEventCallback = (
  payload,
  initializeMap,
  isFirstRequest
) => {
  return dispatch => {
    dispatch(receiveEvent(payload));
    initializeMap();
    let userId = localStorage.getItem("userId");
    dispatch(isUserJoinedToEvent(userId));

    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let eventDate = new Date(payload.event.date.entireDate);
    var diffDays = parseInt((eventDate - currentDate) / (1000 * 60 * 60 * 24));
    // maximum of days allowed for api
    if (isFirstRequest === true) {
      if (diffDays < 5 && diffDays >= 0) {
        dispatch(requestWeather());
        // dispatch(getWeatherApi(payload.event.location.title, diffDays));
      } else {
        dispatch(setDateDifferenceMoreThanMaxAllowed());
      }
    }
  };
};

export const getEvent = (eventId, initializeMap, isFirstRequest = true) => {
  return dispatch => {
    dispatch(requestEvent());
    let payload = {
      event: {}
    };
    firebaseProvider
      .database()
      .ref(`events/${eventId}`)
      .on("value", function(snapshot, prevChildKey) {
        console.log(snapshot.val());
        if (snapshot.val() !== null) {
          payload["event"] = snapshot.val();
          dispatch(
            receiveEventCallback(payload, initializeMap, isFirstRequest)
          );
          isFirstRequest = false;
        }
      });
  };
};

export const getWeatherApi = (location, diffDays) => {
  return dispatch => {
    fetchWeatherLocationKey(
      location.split(" ")[location.split(" ").length - 1]
    ).then(data => {
      if (data.length == 0) {
        dispatch(setWeatherNotAllowed());
      } else
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

export const joinUserToEvent = (userDetails, eventId) => {
  return dispatch => {
    dispatch(requestJoinUserToEvent());
    joinUserToEventFirebase(userDetails, eventId).then(() => {
      dispatch(receiveJoinUserToEvent());
    });
  };
};

export const joinUserToEventFirebase = (userDetails, eventId) => {
  let user = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName
  };
  let updates = {
    [`events/${eventId}/users/${userDetails.userId}`]: user,
    [`users/${userDetails.userId}/events/${eventId}`]: true
  };
  return firebaseProvider
    .database()
    .ref()
    .update(updates);
};

export const cancelUserParticipation = (userId, eventId) => {
  return dispatch => {
    dispatch(requestCancelUserParticipation());
    cancelUserParticipationFirebase(userId, eventId).then(() => {
      dispatch(receiveCancelUserParticipation());
    });
  };
};

export const cancelUserParticipationFirebase = (userId, eventId) => {
  let updates = {
    [`events/${eventId}/users/${userId}`]: null,
    [`users/${userId}/events/${eventId}`]: null
  };
  return firebaseProvider
    .database()
    .ref()
    .update(updates);
};
