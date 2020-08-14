import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    //PASTE FIREBASE CONFIG
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //firebase.analytics();

  // export firestore

  export default firebaseApp.firestore()
