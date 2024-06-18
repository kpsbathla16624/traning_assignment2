
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
    
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const mydatabase = getDatabase(app); 
export { auth, db, mydatabase };

