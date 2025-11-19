import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYdKwms_YS97E6BUuSuGdSoRy1dD4lUr4",
    authDomain: "proyectohuertalmms.firebaseapp.com",
    databaseURL: "https://proyectohuertalmms-default-rtdb.firebaseio.com",
    projectId: "proyectohuertalmms",
    storageBucket: "proyectohuertalmms.firebasestorage.app",
    messagingSenderId: "940351629789",
    appId: "1:940351629789:web:b26125b82bb54d0c23ee34"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
