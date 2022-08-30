export const pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");

export const pintarFondoBlanco = () => {
    pincel.fillStyle = "#F3F5FC";
    pincel.fillRect(0,0,400,500);
}

export const dibujarLinea = (x1,y1,x2,y2) => {
    pincel.beginPath();
    pincel.lineWidth = 3;
    pincel.strokeStyle = "#0A3871";
    pincel.moveTo(x1, y1);
    pincel.lineTo(x2, y2);
    pincel.stroke();
}

const dibujarCirculo = (x,y) => {
    pincel.beginPath();
    pincel.lineWidth = 3;
    pincel.strokeStyle = "#0A3871";
    pincel.arc(x,y,25,0,2*3.14);
    pincel.stroke();
}

export const dibujarMuneco = (intentos) => {
    const segmentos =[[50,300,50,10],[50,10,210,10],[210,10,210,50],[210,75],[210,100,210,220],[210,100,175,135],[210,100,245,135],[210,220,175,255],[210,220,245,255]];
    for (let i=0; i<intentos; i++){
        if (i == 3){
            dibujarCirculo(segmentos[i][0],segmentos[i][1]);
        }
        else {
            dibujarLinea(segmentos[i][0], segmentos[i][1], segmentos[i][2], segmentos[i][3]);
        }
    }
}