// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export default class FireBaseApp {
  #app;
  #firebaseConfig = {
    apiKey: "AIzaSyADlKhrdNpry8rQYG1AbM7Qg7wUh9KmDbg",
    authDomain: "next-fakestore.firebaseapp.com",
    projectId: "next-fakestore",
    storageBucket: "next-fakestore.appspot.com",
    messagingSenderId: "1084125667648",
    appId: "1:1084125667648:web:c4574cc7607743c90fdaa5",
    measurementId: "G-CZXEBX4HZG"
  };

  constructor() {
    this.#app = initializeApp(this.#firebaseConfig);
  }

  getApp() {
    return this.#app;
  }
}