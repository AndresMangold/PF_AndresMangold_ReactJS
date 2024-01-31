
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDJymVoK23VM5Euq2zk0Fn7sbxl2ap9ucE",
  authDomain: "ecommercevmwoodworking.firebaseapp.com",
  projectId: "ecommercevmwoodworking",
  storageBucket: "ecommercevmwoodworking.appspot.com",
  messagingSenderId: "1058598161909",
  appId: "1:1058598161909:web:8d6c008b14c9e895b5a4bc"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)