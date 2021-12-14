import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCDUk8WrZWf8xMyaIbOYcolSceA9WvACE",
  authDomain: "sistema-1d20a.firebaseapp.com",
  projectId: "sistema-1d20a",
  storageBucket: "sistema-1d20a.appspot.com",
  messagingSenderId: "592555718389",
  appId: "1:592555718389:web:e8363066c306b4a70277bc",
  measurementId: "${config.measurementId}"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
