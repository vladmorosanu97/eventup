import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";
import firebaseProvider from "../../config/FireConfig";

export const actionTypes = {
  REQUEST_USER_DETAILS: "REQUEST_USER_DETAILS",
  RECEIVE_USER_DETAILS: "RECEIVE_USER_DETAILS"
};

export const requestUserDetails = () => {
  return {
    type: actionTypes.REQUEST_USER_DETAILS
  };
};

export const receiveUserDetails = data => {
  return {
    type: actionTypes.RECEIVE_USER_DETAILS,
    data: data
  };
};

export const getUserDetails = userId => {
  return dispatch => {
    dispatch(requestUserDetails());
    let payload = {
      user: {}
    };
    firebaseProvider
      .database()
      .ref("users")
      .child(userId)
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["user"] = snapshot.val();
        }
        dispatch(receiveUserDetails(payload.user));
      });
  };
};
