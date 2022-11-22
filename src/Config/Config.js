import  firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {

        apiKey: "AIzaSyDoetawMo5LnYtqQPXMF5O1FWAMpfrtolQ",
        authDomain: "e-commerce-with-react-fe537.firebaseapp.com",
        databaseURL: "https://e-commerce-with-react-fe537-default-rtdb.firebaseio.com",
        projectId: "e-commerce-with-react-fe537",
        storageBucket: "e-commerce-with-react-fe537.appspot.com",
        messagingSenderId: "853200980245",
        appId: "1:853200980245:web:a5a2c7f19ca2d9f0e0411c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }