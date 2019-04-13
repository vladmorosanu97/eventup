import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";
import { snapshotToArray } from "../home/homeActions";
import firebaseProvider from "../../config/FireConfig";
import * as querybase from "querybase";

export const actionTypes = {
  REQUEST_MY_EVENTS_LIST: "REQUEST_MY_EVENTS_LIST",
  RECEIVE_MY_EVENTS_LIST: "RECEIVE_MY_EVENTS_LIST",
  REQUEST_MY_SCHEDULED_EVENTS_LIST: "REQUEST_MY_SCHEDULED_EVENTS_LIST",
  RECEIVE_MY_SCHEDULED_EVENTS_LIST: "RECEIVE_MY_SCHEDULED_EVENTS_LIST"
};

export const requestMyEventsList = () => {
  return {
    type: actionTypes.REQUEST_MY_EVENTS_LIST
  };
};

export const receiveMyEventsList = data => {
  return {
    type: actionTypes.RECEIVE_MY_EVENTS_LIST,
    data: data
  };
};

export const requestMyScheduledEventsList = () => {
  return {
    type: actionTypes.REQUEST_MY_SCHEDULED_EVENTS_LIST
  };
};

export const receiveMyScheduledEventsList = data => {
  return {
    type: actionTypes.RECEIVE_MY_SCHEDULED_EVENTS_LIST,
    data: data
  };
};

export const getMyEvents = userId => {
  return dispatch => {
    dispatch(requestMyEventsList());
    let payload = {
      myEvents: []
    };
    const databaseRef = firebaseProvider
      .database()
      .ref()
      .child("events");
    const querybaseRef = querybase.ref(databaseRef, []);
    querybaseRef
      .where("userId")
      .startsWith(userId)
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["myEvents"] = snapshotToArray(snapshot);
        }
        dispatch(receiveMyEventsList(payload.myEvents));
      });
  };
};

export const getMyScheduledEvents = userId => {
  return dispatch => {
    dispatch(requestMyScheduledEventsList());
    let payload = {
      myEvents: []
    };
    const databaseRef = firebaseProvider
      .database()
      .ref(`events`)
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["scheduledEvents"] = snapshotToArray(snapshot).filter(
            element =>
              element.users !== undefined && element.users[userId] != undefined
          );
        }
        dispatch(receiveMyScheduledEventsList(payload.scheduledEvents));
      });
  };
};

export const fetchMyEventsFirebase = userId => {};
