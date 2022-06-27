import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_FIREBASE_APP_ID,
  apiKey: "AIzaSyDU5weFKFeWBo3ncvu-8ZAaIAIKewWL-Ws",
  authDomain: "auth-development-2199e.firebaseapp.com",
  projectId: "auth-development-2199e",
  storageBucket: "auth-development-2199e.appspot.com",
  messagingSenderId: "749751915733",
  appId: "1:749751915733:web:de961f581e3d87ffd53e5c",
});

export const auth = app.auth();
export default app;
