import HereConfig from "../../config/HereConfig";
import firebaseProvider from "../../config/FireConfig";

export const actionTypes = {
  GET_LOCATION_OPTIONS: "GET_LOCATION_OPTIONS",
  REQUEST_LOCATION_OPTIONS: "REQUEST_LOCATION_OPTIONS",
  RECEIVE_LOCATION_OPTIONS: "RECEIVE_LOCATION_OPTIONS",
  UPDATE_FORM_STATE: "UPDATE_FORM_STATE",
  UPDATE_SUBMIT_BUTTON: "UPDATE_SUBMIT_BUTTON",
  CHECK_FORM_ERRORS: "CHECK_FORM_ERRORS",
  REMOVE_SELECTED_LOCATION: "REMOVE_SELECTED_LOCATION",
  REQUEST_SAVE_EVENT: "REQUEST_SAVE_EVENT",
  RECEIVE_SAVE_EVENT: "RECEIVE_SAVE_EVENT",
  RESET_FORM_STATE: "RESET_FORM_STATE",
  REQUEST_EVENT_LIST: "REQUEST_EVENT_LIST",
  RECEIVE_EVENT_LIST: "RECEIVE_EVENT_LIST",
  REQUEST_LOCATION_COORDINATES: "REQUEST_LOCATION_COORDINATES",
  RECEIVE_LOCATION_COORDINATES: "RECEIVE_LOCATION_COORDINATES",
  INITIALIZE_FORM: "INITIALIZE_FORM"
};

export const resetFormState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_FORM_STATE
    });
  };
};

export const requestLocationOptions = () => {
  return {
    type: actionTypes.REQUEST_LOCATION_OPTIONS
  };
};

export const receiveLocationOptions = data => {
  return {
    type: actionTypes.RECEIVE_LOCATION_OPTIONS,
    data: data
  };
};

export const requestLocationCoordinates = () => {
  return {
    type: actionTypes.REQUEST_LOCATION_COORDINATES
  };
};

export const receiveLocationCoordinates = data => {
  return {
    type: actionTypes.RECEIVE_LOCATION_COORDINATES,
    data: data
  };
};

export const updateSubmitButton = data => {
  return {
    type: actionTypes.UPDATE_SUBMIT_BUTTON,
    data: data
  };
};

export const initializeForm = data => {
  return {
    type: actionTypes.INITIALIZE_FORM,
    data: data
  };
};

export const getLocationCoordinates = (locationId, handleLocation) => {
  return dispatch => {
    dispatch(requestLocationCoordinates());
    return fetch(
      `${HereConfig.BASE_URL_GEOCODE}?app_id=${HereConfig.APP_ID}&app_code=${
        HereConfig.APP_CODE
      }&locationid=${locationId}&gen=8`,
      {
        method: "JSONP",
        callback: "jsoncallback",
        callbackName: "callbackFiiPractic"
      }
    )
      .then(
        resp => {
          return resp.json();
        },
        err => err
      )
      .then(resp => {
        const {
          Latitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const {
          Longitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const locationCoordinates = {
          latitude: Latitude,
          longitude: Longitude
        };
        //         0:
        // Result: Array(1)
        // 0:
        // Location:
        // Address:
        // AdditionalData: Array(1)
        // 0: {value: "Deutschland", key: "CountryName"}
        handleLocation(
          Longitude,
          Latitude,
          resp.Response.View[0].Result[0].Location.Address.AdditionalData[0]
            .value
        );
        dispatch(receiveLocationCoordinates(locationCoordinates));
      });
  };
};

export const requestSaveEvent = () => {
  return {
    type: actionTypes.REQUEST_SAVE_EVENT
  };
};

export const receiveSaveEvent = () => {
  return {
    type: actionTypes.RECEIVE_SAVE_EVENT
  };
};

export const getLocationOptions = suggestion => {
  return dispatch => {
    dispatch(requestLocationOptions());

    //async function for getting the locations (here api)
    return fetch(
      `${HereConfig.BASE_URL_AUTOCOMPLETE}?app_id=${
        HereConfig.APP_ID
      }&app_code=${HereConfig.APP_CODE}&query=${suggestion}&maxresults=10`
    )
      .then(
        resp => {
          return resp.json();
        },
        err => err
      )
      .then(resp => {
        dispatch(receiveLocationOptions(resp));
      });
  };
};

export const updateFormState = (propPath, payload) => {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_FORM_STATE,
      propPath: propPath,
      data: payload
    });
  };
};

export const checkFromErrors = (propPath, payload) => {
  return dispatch => {
    dispatch({
      type: actionTypes.CHECK_FORM_ERRORS
    });
  };
};

export const removeSelectedLocation = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.REMOVE_SELECTED_LOCATION
    });
  };
};

export const saveEvent = payload => {
  return dispatch => {
    dispatch(requestSaveEvent());

    let locationId = payload.location.id;
    //get lat and long for a specific address
    return fetch(
      `${HereConfig.BASE_URL_GEOCODE}?app_id=${HereConfig.APP_ID}&app_code=${
        HereConfig.APP_CODE
      }&locationid=${locationId}&gen=8`,
      {
        method: "JSONP",
        callback: "jsoncallback",
        callbackName: "callbackFiiPractic"
      }
    )
      .then(
        resp => {
          return resp.json();
        },
        err => err
      )
      .then(resp => {
        const {
          Latitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const {
          Longitude
        } = resp.Response.View[0].Result[0].Location.DisplayPosition;
        const newEvent = {
          ...payload,
          location: {
            ...payload.location,
            latitude: Latitude,
            longitude: Longitude
          }
        };
        setNewEvent(newEvent, payload.userId).then(() => {
          dispatch(receiveSaveEvent());
        });
      });
  };
};

export const initializeFormFirebase = (eventId, handleLocation) => {
  return dispatch => {
    let payload = {
      event: ""
    };
    return firebaseProvider
      .database()
      .ref(`events/${eventId}`)
      .once("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["event"] = snapshot.val();
          dispatch(initializeForm(payload.event));
          handleLocation(
            payload.event.location.longitude,
            payload.event.location.latitude,
            payload.event.title
          );
        }
      });
  };
};

export const setNewEvent = (event, userId) => {
  return firebaseProvider
    .database()
    .ref("events")
    .push()
    .set(event);
};

export const updateEvent = (eventId, payload) => {
  return dispatch => {
    firebaseProvider
      .database()
      .ref(`events/${eventId}`)
      .update({
        ...payload
      });
  };
};
