import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDMnEPtysLIxBkwoxyF69Vozq8JELIjDKI",
  authDomain: "letmeask-20fb6.firebaseapp.com",
  databaseURL: "https://letmeask-20fb6-default-rtdb.firebaseio.com",
  projectId: "letmeask-20fb6",
  storageBucket: "letmeask-20fb6.appspot.com",
  messagingSenderId: "601265444713",
  appId: "1:601265444713:web:29061b6f61f7e13ce6cff8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();