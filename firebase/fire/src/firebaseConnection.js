import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqyHW1ynvwFJ9GX6bQsdZwECk9Vdwwu8c",
  authDomain: "curso-24b4c.firebaseapp.com",
  projectId: "curso-24b4c",
  storageBucket: "curso-24b4c.appspot.com",
  messagingSenderId: "714523409516",
  appId: "1:714523409516:web:643146bbf7880e264b6c49",
  measurementId: "${config.measurementId}"
};

if(!firebase.apps.length){
  // Initialize Firebase
  firebase.default.initializeApp(firebaseConfig); 
}

export default firebase;