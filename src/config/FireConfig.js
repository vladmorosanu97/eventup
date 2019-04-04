import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

const config = {
  //TODO: create your firebase project and change it with your credentials :D
  apiKey: "AIzaSyCdqalKiQSL_Aso489UAg5ZtC2uIODd_yM",
  authDomain: "eventup-ba10b.firebaseapp.com",
  databaseURL: "https://eventup-ba10b.firebaseio.com",
  projectId: "eventup-ba10b",
  storageBucket: "eventup-ba10b.appspot.com",
  messagingSenderId: "427285662570"
};

const firebaseProvider = firebase.initializeApp(config);
export default firebaseProvider;
