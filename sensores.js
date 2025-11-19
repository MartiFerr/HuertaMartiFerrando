import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


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
const db = getDatabase(app);


let humedadValor = document.getElementById("humedadValor");
let temperaturaValor = document.getElementById("temperaturaValor");

let plantaImg = document.getElementById("plantaImg");
let estadoPlanta = document.getElementById("estadoPlanta");

let datoCurioso = document.getElementById("datoCurioso");
let consejoPlanta = document.getElementById("consejoPlanta");

let cardTemp = document.getElementById("cardTemperatura");
let cardHum = document.getElementById("cardHumedad");


const refSensores = ref(db, "sensores");


const curiosidades = [
    "El tomate deja de producir polen arriba de 32°C.",
    "Las plantas absorben el 90% del agua por sus raíces.",
    "La lechuga crece más rápido en temperaturas frescas.",
    "El exceso de riego puede causar hongos mortales.",
    "Las plantas se 'estresan' cuando hay calor extremo.",
    "La zanahoria crece torcida si el suelo está muy seco."
];

function setEstadoCard(card, estado) {
    card.classList.remove("estado-verde", "estado-amarillo", "estado-rojo");
    card.classList.add(estado);
}

onValue(refSensores, (data) => {
    let sensor = data.val();

    let h = sensor.humedad;
    let t = sensor.temperatura;

    humedadValor.textContent = h + "%";
    temperaturaValor.textContent = t + "°C";

    if (h < 30) setEstadoCard(cardHum, "estado-rojo");
    else if (h < 50) setEstadoCard(cardHum, "estado-amarillo");
    else setEstadoCard(cardHum, "estado-verde");

    if (t < 10 || t > 40) setEstadoCard(cardTemp, "estado-rojo");
    else if (t < 18 || t > 30) setEstadoCard(cardTemp, "estado-amarillo");
    else setEstadoCard(cardTemp, "estado-verde");

    if (t > 40) plantaImg.src = "planta-calor.jpg";
    else if (t < 10) plantaImg.src = "planta-frio.jpg";
    else if (h < 30) plantaImg.src = "planta-seca.jpg";
    else if (h > 85) plantaImg.src = "planta-hongos.jpg";
    else plantaImg.src = "plantasana.jpg";

    if (t > 40) estadoPlanta.textContent = "Mucho calor, riesgo de quemarse";
    else if (t < 10) estadoPlanta.textContent = "Mucho frío, la planta detiene su crecimiento";
    else if (h < 30) estadoPlanta.textContent = "Falta agua, la planta está marchita";
    else if (h > 85) estadoPlanta.textContent = " Demasiada humedad, riesgo de hongos";
    else estadoPlanta.textContent = "Planta en buen estado";

    datoCurioso.textContent = "Dato: " + curiosidades[Math.floor(Math.random() * curiosidades.length)];

    if (t > 40) consejoPlanta.textContent = "Consejo: poné sombra o regá ligeramente por la tarde.";
    else if (t < 10) consejoPlanta.textContent = "Consejo: ponela cerca de una pared o dentro.";
    else if (h < 30) consejoPlanta.textContent = "Consejo: regá la base sin mojar las hojas.";
    else if (h > 85) consejoPlanta.textContent = " Consejo: ventilá la zona para evitar hongos.";
    else consejoPlanta.textContent = " Consejo: seguí así, la planta está perfecta.";

    document.getElementById("barHumedad").width = h + "%";
document.getElementById("barTemperatura").style.width = (t * 2.5) + "%"; 
});


