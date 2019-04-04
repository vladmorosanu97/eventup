import HereConfig from "../../config/HereConfig";
import firebaseProvider from "../../config/FireConfig";
import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";

export const actionTypes = {
  REQUEST_EVENT_LIST: "REQUEST_EVENT_LIST",
  RECEIVE_EVENT_LIST: "RECEIVE_EVENT_LIST",
  SEARCH_EVENT: "SEARCH_EVENT"
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

export const getEventList = () => {
  return dispatch => {
    dispatch(requestEventList());
    fetchEventListFirebase().then(rsp => {
      dispatch(receiveEventList(rsp));
    });
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
