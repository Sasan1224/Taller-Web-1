import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore"
import firebaseConfig from "../funcion/firebase";
import {getStorage}from"firebase/storage"


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app)

export {app,auth,js,storage, db}