import firebaseProvider from "../../config/FireConfig";

export const actionTypes = {
  REQUEST_EVENT: "REQUEST_EVENT",
  RECEIVE_EVENT: "RECEIVE_EVENT"
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

export const getEvent = eventId => {
  return dispatch => {
    dispatch(requestEvent());

    fetchEventFirebase(eventId).then(rsp => {
      dispatch(receiveEvent(rsp));
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
