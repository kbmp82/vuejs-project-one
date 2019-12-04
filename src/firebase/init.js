//jshint esversion:6
import firebase from 'firebase';
import firestore from 'firebase/firestore';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAmqTgOrtOdy-HrDIpMfkoHGMuHzfD4cgA",
    authDomain: "ninja-smoothies-a698b.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-a698b.firebaseio.com",
    projectId: "ninja-smoothies-a698b",
    storageBucket: "ninja-smoothies-a698b.appspot.com",
    messagingSenderId: "674532028712",
    appId: "1:674532028712:web:f7b9ddd9ffd57d4adce01d"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
//export firestore DB
export default firebaseApp.firestore();
