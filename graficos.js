export const pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");

export const pintarFondoBlanco = () => {
    pincel.fillStyle = "#F3F5FC";
    pincel.fillRect(0,0,400,500);
}

export const dibujarLinea = (x1,y1,x2,y2) => {
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

export const dibujarMuneco = (intentos) => {
    const segmentos =[[90,500,90,10],[85,10,275,10],[270,10,270,50],[270,100],[270,150,270,370],[270,150,195,225],[270,150,345,225],[270,370,195,445],[270,370,345,445]];
    for (let i=0; i<intentos; i++){
        if (i == 3){
            dibujarCirculo(segmentos[i][0],segmentos[i][1]);
        }
        else {
            dibujarLinea(segmentos[i][0], segmentos[i][1], segmentos[i][2], segmentos[i][3]);
        }
    }
}