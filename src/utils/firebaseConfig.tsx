/* eslint-disable import/no-duplicates */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp689WAandDOKJWwCXIrQ64BOb0FAA_Nc",
  authDomain: "instagram-clone-dc16b.firebaseapp.com",
  projectId: "instagram-clone-dc16b",
  storageBucket: "instagram-clone-dc16b.appspot.com",
  messagingSenderId: "894397357625",
  appId: "1:894397357625:web:7fc881772bf22befbb37e8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
