import {
  initializeApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

import { getAnalytics, logEvent  } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";
import { getFirestore,   
  //FIRESTORE
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc, 
  updateDoc, 
  doc, 
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

import {
  //Cloud Storage
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

//cuando se inicie la aplicacion verifica si hay una sesion abierta de lo contrario abre una nueva en firebase
if (getApps.length === 0) {
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBvjOpa-uBTfA_pBzo3MbO72dQabPRNUO0",
    authDomain: "proyecto-gloasario.firebaseapp.com",
    databaseURL: "https://proyecto-gloasario-default-rtdb.firebaseio.com",
    projectId: "proyecto-gloasario",
    storageBucket: "proyecto-gloasario.appspot.com",
    messagingSenderId: "909726365107",
    appId: "1:909726365107:web:10056c5752f289ecc047c6",
    measurementId: "G-H8LV0V60PQ",
  });
}

const db = getFirestore();
const auth = getAuth();
const analytics = getAnalytics();
const strg = getStorage();
logEvent(analytics, 'notification_received');

export {
  db,
  auth,
  getApps,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut,
  //firestore
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc, 
  updateDoc, 
  doc, 
  arrayUnion,
  //storage
  strg,
  ref,
  uploadBytes,
  getDownloadURL,
  //analytics
  analytics
};


