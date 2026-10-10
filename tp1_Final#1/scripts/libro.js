let numEscena = 0;

// cordenadas de la zona de botones + LOS TEXTOS
let CordBtnGeneral = [620, 780, 410, 430]; // CORDENADA PARA EL BOTON DE SIGUIENTE ESCENA
let decision1CordBtn1 = [182, 322, 410, 430];
let decision1CordBtn2 = [365, 595, 410, 430];
let decision1Txt = ["Ir al hotel", "SegUir Desconocido"];
let decision1Btn = [decision1Txt, decision1CordBtn1, decision1CordBtn2,];

let decision2CordBtn1 = [165, 335, 410, 430];
let decision2CordBtn2 = [340, 625, 410, 430];
let decision2Txt = ["Usar la radio", "Liberarlo por tU cUenta"];
let decision2Btn = [decision2Txt, decision2CordBtn1, decision2CordBtn2,];

let decision3CordBtn1 = [140, 365, 410, 430];
let decision3CordBtn2 = [368, 595, 410, 430];
let decision3Txt = ["SegUir los simbolos", "SegUir el detector"];
let decision3Btn = [decision3Txt, decision3CordBtn1, decision3CordBtn2,];


function comienzoLibro() {
    image(escenas[numEscena], 0, 0, 800, 450);
    mostrarTexto(numEscena);
    mostrarBtn(numEscena);
}

function mostrarTexto(){
    noStroke();
    fill(0,205);
    rect(0,326,800,124);

    fill(255);
    textStyle(NORMAL);
    textAlign(LEFT, BASELINE); // Correccion para que se alinea por desacomodo del texto de la intro.
    textSize(14);
    text(textos[numEscena], 25,350,755,104);
}

function mostrarBtn(){
    textSize(16);
    
    if (esEscenaDeDecision()) {
        let infoBtn = cargoInfoBtnEscenaDecision();
        textAlign(CENTER);
        hoverTxtBtn(infoBtn[1]); // cordenadas del boton 1
        text(infoBtn[0][0],250,425); // txt del boton 1
        hoverTxtBtn(infoBtn[2]); // cordenadas del boton 2
        text(infoBtn[0][1],480,425); // txt del boton 2
    } else {
        hoverTxtBtn(CordBtnGeneral);
        textAlign(RIGHT);
        text(textosBTN[numEscena],760,430);
    }

}

function hoverTxtBtn(zonaBoton){
    if (estoyEnZonaBoton(zonaBoton)){
        if(esEscenaDeDecision()){
            fill('red');
            textStyle(BOLD);
            text("¤",zonaBoton[0],426);
            text("¤",zonaBoton[1],426);
        } else {
            fill('red');
            textStyle(BOLD);
            text(" >",765,430);
        }
    } else {
        fill(255);
        textStyle(NORMAL);
    }

}

function esEscenaDeDecision(){
    if (numEscena === 2 || numEscena === 7 || numEscena === 17) {
        return true;
    }
    return false;
}

function esEscenaDeFinal(){
    if (numEscena === 11 || numEscena === 12 || numEscena === 22 || numEscena === 25) {
        return true;
    }
    return false;
}

function estoyEnZonaBoton(zonaBoton){
    if (mouseX > zonaBoton[0] && mouseX < zonaBoton[1] &&mouseY > zonaBoton[2] && mouseY < zonaBoton[3]) {
        return true;
    }
    return false;
}

function cargoInfoBtnEscenaDecision(){
    if (numEscena === 2) {
        return decision1Btn;
    } else if (numEscena === 7) {
        return decision2Btn;
    } else if (numEscena === 17) {
        return decision3Btn;
    }
    return null;
}