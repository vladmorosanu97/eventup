import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";
import { snapshotToArray } from "../home/homeActions";
import firebaseProvider from "../../config/FireConfig";
import * as querybase from "querybase";

export const actionTypes = {
  REQUEST_USER_EVENTS: "REQUEST_USER_EVENTS",
  RECEIVE_USER_EVENTS: "RECEIVE_USER_EVENTS",
  REQUEST_USER_SCHEDULED_EVENTS: "REQUEST_USER_SCHEDULED_EVENTS",
  RECEIVE_USER_SCHEDULED_EVENTS: "RECEIVE_USER_SCHEDULED_EVENTS"
};

export const requestUserEvents = () => {
  return {
    type: actionTypes.REQUEST_USER_EVENTS
  };
};

export const receiveUserEvents = data => {
  return {
    type: actionTypes.RECEIVE_USER_EVENTS,
    data: data
  };
};

export const requestUserScheduledEvents = () => {
  return {
    type: actionTypes.REQUEST_USER_SCHEDULED_EVENTS
  };
};

export const receiveUserScheduledEvents = data => {
  return {
    type: actionTypes.RECEIVE_USER_SCHEDULED_EVENTS,
    data: data
  };
};

export const getUserEvents = userId => {
  return dispatch => {
    dispatch(requestUserEvents());
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
        dispatch(receiveUserEvents(payload.myEvents));
      });
  };
};

export const getUserScheduledEvents = userId => {
  return dispatch => {
    dispatch(requestUserScheduledEvents());
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
        dispatch(receiveUserScheduledEvents(payload.scheduledEvents));
      });
  };
};
