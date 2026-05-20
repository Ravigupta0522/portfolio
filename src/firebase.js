import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEdrh1mB7mGnK-oe3-AWjfSxP6sjivFpI",
  authDomain: "ravi-portfolio-bf0eb.firebaseapp.com",
  projectId: "ravi-portfolio-bf0eb",
  storageBucket: "ravi-portfolio-bf0eb.firebasestorage.app",
  messagingSenderId: "519380852600",
  appId: "1:519380852600:web:8fc6756e8f78d890d8328d",
  measurementId: "G-6HZV6QQ4WJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics sirf browser mein load karo
isSupported().then((yes) => yes && getAnalytics(app));