import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIYDDrn5_JIYYNplqvmWTD4H3a6RM7aVQ",
  authDomain: "entrega-react-mati.firebaseapp.com",
  projectId: "entrega-react-mati",
  storageBucket: "entrega-react-mati.firebasestorage.app",
  messagingSenderId: "681704422857",
  appId: "1:681704422857:web:abd432d407571bed2d3c18",
  measurementId: "G-GNWLG39JD5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);