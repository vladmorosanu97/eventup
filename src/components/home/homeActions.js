import HereConfig from "../../config/HereConfig";
import firebaseProvider from "../../config/FireConfig";
import OlMapFunction from "../../services/map/OlMap";
import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";

export const actionTypes = {
  REQUEST_EVENT_LIST: "REQUEST_EVENT_LIST",
  RECEIVE_EVENT_LIST: "RECEIVE_EVENT_LIST",
  SEARCH_EVENT: "SEARCH_EVENT",
  CALCULATE_DISTANCES_SUCCESS: "CALCULATE_DISTANCES_SUCCESS",
  CALCULATE_DISTANCES_FAILED: "CALCULATE_DISTANCES_FAILED"
};

export const requestEventList = () => {
  return {
    type: actionTypes.REQUEST_EVENT_LIST
  };
};

export const receiveEventList = data => {
  return {
    type: actionTypes.RECEIVE_EVENT_LIST,
    data: data
  };
};

export const requestSearchEvents = search => {
  return {
    type: actionTypes.SEARCH_EVENT,
    search: search
  };
};

export const calculateDistanceError = data => {
  return {
    type: actionTypes.CALCULATE_DISTANCES_FAILED,
    data: data
  };
};

export const calculateDistanceDone = events => {
  return {
    type: actionTypes.CALCULATE_DISTANCES_SUCCESS,
    data: events
  };
};

export const getEventList = () => {
  return dispatch => {
    dispatch(requestEventList());
    fetchEventListFirebase().then(rsp => {
      dispatch(receiveEventList(rsp));
      dispatch(calculateDistance(rsp.eventList));
    });
  };
};

export const calculateDistance = events => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const appMap = new OlMapFunction({
          projectionCode: "EPSG:3857",
          zoom: 3,
          center: [0, 4813697]
        });
        events.forEach(event => {
          let distance = appMap.calculateDistance(
            { lat: pos.coords.latitude, long: pos.coords.longitude },
            { lat: event.location.latitude, long: event.location.longitude }
          );

          event.location["distance"] = distance;
        });

        dispatch(calculateDistanceDone(events));
        // appMap.centerMap(pos.coords.longitude, pos.coords.latitude);
      },
      error => {
        dispatch(
          calculateDistanceError("Allow your location to see distances")
        );
      }
    );
  };
};

export const fetchEventListFirebase = () => {
  let payload = {
    eventList: []
    /*hint
          REVIEW  challenge accepted
         *here you can add another array for scheduled events
         *fetch scheduled events from firebase
         */
  };
  return firebaseProvider
    .database()
    .ref("events")
    .once("value", snapshot => {
      if (snapshot.val() !== null) {
        payload["eventList"] = snapshotToArray(snapshot);
      }
    })
    .then(() => {
      return payload;
    });
};

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.eventId = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
