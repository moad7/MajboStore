import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdqVkOG0rlHvCTRlc1UX0ZLNbzAUjm3ZY",
  authDomain: "prostore-509c0.firebaseapp.com",
  projectId: "prostore-509c0",
  storageBucket: "prostore-509c0.appspot.com",
  messagingSenderId: "761547215422",
  appId: "1:761547215422:web:fa76ebf59846f5a95a776f",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
