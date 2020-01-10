import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
const firebaseConfig = {
    apiKey: "AIzaSyCdV7y7EO7Jm_kr8ZUrv2jalodg2GW1IP8",
    authDomain: "sisman-359a5.firebaseapp.com",
    databaseURL: "https://sisman-359a5.firebaseio.com",
    projectId: "sisman-359a5",
    storageBucket: "sisman-359a5.appspot.com",
    messagingSenderId: "413861908257",
    appId: "1:413861908257:web:f43ac4736536d47759f860"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };