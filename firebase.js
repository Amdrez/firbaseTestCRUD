// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    getDoc,
    updateDoc
    /* Comentarios sobre estas funciones de arriba ^^^ 
        ver documentacion de estos en:
        https://firebase.google.com/docs/firestore/manage-data/add-data

        para entender mas a profundidad como funcionan

        en la imagen de esta carpeta contenedora de este mismo archivo
        esta especificada la parte mas importante a revisar en la documentacion sobre estas funciones
        dicha imagen se llama comentariosFirebase

        todo esto es para llegar a un nivel intermedio a avanzado
    */    

} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBknEjiEnXD6gY2bKa-aJbeH9XJJj7ENL0",
  authDomain: "fb-js-crud-237ad.firebaseapp.com",
  projectId: "fb-js-crud-237ad",
  storageBucket: "fb-js-crud-237ad.appspot.com",
  messagingSenderId: "825434862365",
  appId: "1:825434862365:web:e61bab89adbddefef367f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) =>
    addDoc(collection(db, 'tasks'), {title, description});

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

export const getOneTask = (id) => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);




