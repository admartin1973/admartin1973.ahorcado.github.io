const inicio = document.querySelector(".inicio");
const nuevoJuego = document.querySelector(".nuevo-juego");
const btnNuevoJuego = document.querySelector("#btn-nuevo-juego");
const btnDesistir = document.querySelector("#btn-desistir");
const divPalabra = document.querySelector(".palabra");
const divFinal = document.querySelector(".final");
const btnJugarDeNuevo = document.querySelector("#btn-jugar-de-nuevo");
const letrasNoAdivinadas = document.querySelector(".no-adivinadas");
const pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");
const espacio = letrasNoAdivinadas.textContent; //guardar valor original para el reinicio;
//pantalla
pincel.fillStyle = "#F3F5FC";
pincel.fillRect(0,0,400,500);

const dibujarLinea = (x1,y1,x2,y2) => {
    pincel.beginPath();
    pincel.lineWidth = 10;
    pincel.strokeStyle = "#0A3871";
    pincel.moveTo(x1, y1);
    pincel.lineTo(x2, y2);
    pincel.stroke();
}

const dibujarCirculo = (x,y) => {
    pincel.beginPath();
    pincel.lineWidth = 10;
    pincel.strokeStyle = "#0A3871";
    pincel.arc(x,y,50,0,2*3.14);
    pincel.stroke();
}

const dibujarMuneco = (intentos) => {
    const segmentos =[[90,490,90,10],[85,10,325,10],[320,10,320,50],[320,100],[320,150,320,370],[320,150,245,225],[320,150,395,225],[320,370,245,445],[320,370,395,445]];
    for (let i=0; i<intentos; i++){
        if (i == 3){
            dibujarCirculo(segmentos[i][0],segmentos[i][1]);
        }
        else {
            dibujarLinea(segmentos[i][0], segmentos[i][1], segmentos[i][2], segmentos[i][3]);
        }
    }
}

nuevoJuego.style.display = "none";
pantalla.style.display = "none";
dibujarLinea(0,490,490,490);

const palabras = ["ALURA","ORACLE","HTML","JAVASCRIPT","PROGRAMACION","REACT","CANVAS","VARIABLE","BUCLE","ITERACION","INFORMATICA"];
let indice = Math.round(Math.random()*palabras.length);
let palabra = palabras[indice-1];


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
    pincel.fillStyle = "#F3F5FC";
    pincel.fillRect(0,0,400,500);
    dibujarLinea(0,490,490,490,"#0A3871");
    indice = Math.round(Math.random()*palabras.length);
    palabra = palabras[indice-1];
}

const jugar = () => {
    divFinal.style.display = "none";
    pantalla.style.display = "inline";
    for (let i=0; i<palabra.length; i++){
        let letra = palabra[i].toUpperCase();
        divPalabra.insertAdjacentHTML("beforeend", `<div><h1>${letra}</h1></div>`)
    }
    let intentos = 0;
    let coincidencias = 0;
    let letrasAdivinadas = "";
    document.addEventListener("keypress", comparaLetra = event => {
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
    });
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





