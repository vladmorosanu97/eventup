import "es6-promise";
import "isomorphic-fetch";
import "fetch-jsonp-polyfill";
import firebaseProvider from "../../config/FireConfig";

export const actionTypes = {
  REQUEST_SEARCH_USER: "REQUEST_SEARCH_USER",
  RECEIVE_SEARCH_USER: "RECEIVE_SEARCH_USER"
};

export const requestSearchUser = () => {
  return {
    type: actionTypes.REQUEST_SEARCH_USER
  };
};

export const receiveSearchUser = data => {
  return {
    type: actionTypes.RECEIVE_SEARCH_USER,
    data: data
  };
};

export const searchUser = value => {
  return dispatch => {
    dispatch(requestSearchUser());
    let payload = {
      users: []
    };
    firebaseProvider
      .database()
      .ref()
      .child("users")
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          payload["users"] = snapshotToArray(snapshot).filter(element =>
            element.firstName
              .toLowerCase()
              .includes(
                value.toLowerCase() ||
                  element.lastName.toLowerCase().includes(value.toLowerCase())
              )
          );
        }
        dispatch(receiveSearchUser(payload.users));
      });
  };
};

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.userId = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
