// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyCrVbyBhE71HmIyxeIolXQSh2EEipGwoHQ",
  authDomain: "fagl-ztz.firebaseapp.com",
  projectId: "fagl-ztz",
  storageBucket: "fagl-ztz.appspot.com",
  messagingSenderId: "753131051838",
  appId: "1:753131051838:web:f9992d6d1bf23dd4e0ea6f",
  measurementId: "G-9T1HBETP7X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
