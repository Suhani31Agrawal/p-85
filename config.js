import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    /*apiKey: "AIzaSyB7yZZEmlglBPZZUGz57DLvO8710Dha274",
    authDomain: "workflowapp-a5a5a.firebaseapp.com",
    projectId: "workflowapp-a5a5a",
    storageBucket: "workflowapp-a5a5a.appspot.com",
    messagingSenderId: "405297360413",
    appId: "1:405297360413:web:068f2a6acbc358283b60f4"  */

    apiKey: "AIzaSyDphgBQ3uNxz83WIYSsTIoovS9N6uEW4ZM",
    authDomain: "workflow-4f5db.firebaseapp.com",
    projectId: "workflow-4f5db",
    storageBucket: "workflow-4f5db.appspot.com",
    messagingSenderId: "885875185080",
    appId: "1:885875185080:web:a591375dc70075c8e02b4d"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
