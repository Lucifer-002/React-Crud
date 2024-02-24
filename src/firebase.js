// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgdcslKXkuOXpyb4J6gYj_8XPBsex7aoM",
  authDomain: "crud-img-eefb7.firebaseapp.com",
  projectId: "crud-img-eefb7",
  storageBucket: "crud-img-eefb7.appspot.com",
  messagingSenderId: "557190983623",
  appId: "1:557190983623:web:ac7219ee3cf31e016db3e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

