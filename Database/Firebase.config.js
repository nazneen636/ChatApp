import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzOeUlfuwN1KR8fHj3R8KcVo_EABCcayk",
  authDomain: "chatapp-a673f.firebaseapp.com",
  projectId: "chatapp-a673f",
  storageBucket: "chatapp-a673f.firebasestorage.app",
  messagingSenderId: "493621242833",
  appId: "1:493621242833:web:661710873c93acf14a0ef0",
};

console.log("firebase added");
const app = initializeApp(firebaseConfig);
export default app;
