import firebase from 'firebase';
require('@firebase/firestore');




// Your web app's Firebase configuration
var firebaseConfig = {
 apiKey: "AIzaSyD0kWRT5iWT9gRZbk2nVM9GoenobSWtolA",
 authDomain: "wily-app-2-c9588.firebaseapp.com",
 projectId: "wily-app-2-c9588",
 storageBucket: "wily-app-2-c9588.appspot.com",
 messagingSenderId: "301096216956",
 appId: "1:301096216956:web:8d81c651d87aefb30e1cf9"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebaseConfig
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); } 

export default firebase.firestore()
