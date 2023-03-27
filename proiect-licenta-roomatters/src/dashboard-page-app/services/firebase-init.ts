import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBW12b7s-x29_lX-02ydsEwbfUZPrnyiC0",
  authDomain: "roomatters-92590.firebaseapp.com",
  databaseURL: "https://roomatters-92590.firebaseio.com",
  projectId: "roomatters-92590",
  storageBucket: "roomatters-92590.appspot.com",
  messagingSenderId: "92982762453",
  appId: "1:92982762453:web:0f001a399e878e389cfb5c",
  measurementId: "G-D66Q2LCP97",
};

let FirebaseApp: firebase.app.App;
try {
  FirebaseApp = firebase.app();
} catch (error) {
  FirebaseApp = firebase.initializeApp(firebaseConfig);
}

export default FirebaseApp;
export const FirebaseAuth: firebase.auth.Auth = FirebaseApp.auth();
export const Database: firebase.firestore.Firestore = FirebaseApp.firestore();
export const Storage: firebase.storage.Storage = FirebaseApp.storage();
export const RootBucket: firebase.storage.Reference = Storage.ref();

FirebaseAuth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user is logged in: ", user);
  } else {
    console.log("user is not logged in");
  }
});
