import { pantalla, pintarFondoBlanco, dibujarLinea, dibujarMuneco } from "./graficos.js";
const inicio = document.querySelector(".inicio");
const nuevoJuego = document.querySelector(".nuevo-juego");
const btnNuevoJuego = document.querySelector("#btn-nuevo-juego");
const btnDesistir = document.querySelector("#btn-desistir");
const divPalabra = document.querySelector(".palabra");
const divFinal = document.querySelector(".final");
const btnJugarDeNuevo = document.querySelector("#btn-jugar-de-nuevo");
const letrasNoAdivinadas = document.querySelector(".no-adivinadas");
const espacio = letrasNoAdivinadas.textContent; //guardar valor original para el reinicio;

nuevoJuego.style.display = "none";
pantalla.style.display = "none";
dibujarLinea(0,490,490,490);

const palabras = ["ALURA","ORACLE","HTML","JAVASCRIPT","PROGRAMACION","REACT","CANVAS","VARIABLE","BUCLE","ITERACION","INFORMATICA"];
let indice = Math.round(Math.random()*(palabras.length-1));
let palabra = palabras[indice];


const finalizar = (texto, color) => {
    divFinal.textContent = texto;
    divFinal.style.display = "inline";
    divFinal.style.color = color;
    document.removeEventListener("keypress", comparaLetra);
}

const reset = () => {
    while (divPalabra.firstChild) {
        divPalabra.removeChild(divPalabra.firstChild);
    }
    letrasNoAdivinadas.textContent = espacio;
    document.removeEventListener("keypress", comparaLetra);
    pintarFondoBlanco();
    dibujarLinea(0,490,490,490,"#0A3871");
    indice = Math.round(Math.random()*(palabras.length-1));
    palabra = palabras[indice];
    console.log(indice);
    intentos = 0;
    coincidencias = 0;
    letrasAdivinadas = "";
}

let intentos = 0;
let coincidencias = 0;
let letrasAdivinadas = "";

const comparaLetra = event => {
    let letra = event.key.toUpperCase();
    if (!letrasNoAdivinadas.textContent.includes(letra)){
        if (!letrasAdivinadas.includes(letra)){
            for (let i=0; i<palabra.length; i++){
                if (letra === palabra[i]){
                    let div = document.querySelector(`.palabra > div:nth-child(${i+1}) > h1`);
                    div.style.color = "#0A3871";
                    letrasAdivinadas += letra;
                    coincidencias++
                }
            }
            if (!letrasAdivinadas.includes(letra)){
                letrasNoAdivinadas.textContent += letra
                intentos++
                dibujarMuneco(intentos);
            }
        }
    }  
    if (coincidencias === palabra.length){
        finalizar("Ganaste, felicidades!", "green");
    }
    if (intentos === 9){
        finalizar("Fin del juego, la palabra era " + palabra, "red");
    }
}

const jugar = () => {
    divFinal.style.display = "none";
    pantalla.style.display = "inline";
    for (let i=0; i<palabra.length; i++){
        let letra = palabra[i].toUpperCase();
        divPalabra.insertAdjacentHTML("beforeend", `<div><h1>${letra}</h1></div>`)
    }
    document.addEventListener("keypress", comparaLetra);
}

btnNuevoJuego.addEventListener("click", ()=> {
    inicio.style.display = "none";
    nuevoJuego.style.display = "flex";
    jugar();
})

btnDesistir.addEventListener("click", ()=> {
    nuevoJuego.style.display = "none";
    inicio.style.display = "flex";
    reset();
})

btnJugarDeNuevo.addEventListener("click", ()=> {
    reset();
    jugar();
})





