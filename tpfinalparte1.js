let fondo;
let papiroAbrir = [];
let papiroCerrar = [];
let estadoIntro = "apareciendo";
let inicioEstado = 0;

let fuente;
let textos = [];
let textosBTN = [];
let escenas = [];

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

let posYPapiro = 450;
const velocidadPapiro = 5.5;
const duracionSprite = 130;
const esperaApertura = 1000;

let opacidad = 0;
let etapaTexto = 1;
const velocidadOpacidad = 5.5;
const esperaTexto = 2800;


function preload() {

    fondo = loadImage("./imagenes/intro_fondo.png");

    for (let j = 4; j > -1; j--) {
        papiroAbrir.push(loadImage(`./imagenes/intro/papiro_${j}.png`));
    }

    for (let i = 0; i < 5; i++) {
        papiroCerrar.push(loadImage(`./imagenes/intro/papiro_${i}.png`));
    }

    for (let k = 0; k < 26; k++) {
        escenas.push(loadImage(`./imagenes/pantallas/${k}.png`));
    }

    fuente = loadFont("fuente/Justv2.ttf");
    textos = loadStrings("textos/textos_escenas.txt");
    textosBTN = loadStrings("textos/textos_botones.txt");
    
}

function setup() {
    createCanvas(800, 450);
    inicioEstado = millis();
}

function draw() {
    textFont(fuente);
    actualizarEstadoIntro();
    image(fondo, 0, 0, 800, 450);
    
    if (estadoIntro !== "fin") {
        mostrarPapiro();
    } else if (estadoIntro === "fin") {
        comienzoLibro();
    }

    if (estadoIntro === "mostrandoTexto" || estadoIntro === "esperandoTexto") {
        mostrarTextoIntro(etapaTexto);
    }    
    
}

function mousePressed(){

    if (estoyEnZonaBoton(CordBtnGeneral)){
        if (esEscenaDeFinal()) {
            numEscena = 0; // vuelvo al inicio
        } else if (esEscenaDeDecision() === false) {
            numEscena++; // avanzo a la siguiente escena
        }
    } else if(esEscenaDeDecision()) {

        if(numEscena === 2){
            if(estoyEnZonaBoton(decision1CordBtn1)){
                numEscena = 13;
            } else if(estoyEnZonaBoton(decision1CordBtn2)){
                numEscena++;
            }
        }

        if(numEscena === 7){
            if(estoyEnZonaBoton(decision2CordBtn1)){
                numEscena++;
            } else if(estoyEnZonaBoton(decision2CordBtn2)){
                numEscena = 12;
            }
        }

        if(numEscena === 17){
            if(estoyEnZonaBoton(decision3CordBtn1)){
                numEscena = 23;
            } else if(estoyEnZonaBoton(decision3CordBtn2)){
                numEscena++;
            }
        }

    } else if (esEscenaDeFinal() && estoyEnZonaBoton(CordBtnGeneral)) {
        numEscena = 0;
    }

}


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



function actualizarEstadoIntro() {

    let tiempoXEstado = millis() - inicioEstado;


    if (estadoIntro === "apareciendo") {
        posYPapiro -= velocidadPapiro;
        if (posYPapiro <= 0) {
            posYPapiro = 0;
            cambiarEstado("abriendo");
        }

    } else if (estadoIntro === "abriendo") {
        if (tiempoXEstado >= papiroAbrir.length * duracionSprite) { // si el array papiro se mostro por completo.
            cambiarEstado("mostrandoTexto");
        }

    } else if (estadoIntro === "mostrandoTexto") {
        opacidad += velocidadOpacidad;
        if (opacidad >= 255) {
            opacidad = 255;
            cambiarEstado("esperandoTexto");
        }

    } else if (estadoIntro === "esperandoTexto") {
        if (tiempoXEstado >= esperaTexto) {
            cambiarEstado("cerrando");
        }

    } else if (estadoIntro === "cerrando") {
        if (tiempoXEstado >= papiroCerrar.length * duracionSprite) { // si el array papiro se mostro por completo.
            if (etapaTexto < 3) {
                etapaTexto++;
                cambiarEstado("esperandoApertura");
            } else {
                cambiarEstado("desapareciendo");
            }
        }

    } else if (estadoIntro === "esperandoApertura") {
        if (tiempoXEstado >= esperaApertura) {
            cambiarEstado("abriendo");
        }

    } else if (estadoIntro === "desapareciendo") {
        posYPapiro += velocidadPapiro;
        if (posYPapiro >= 450) {
            posYPapiro = 450;
            cambiarEstado("fin");
        }
    }
}

function cambiarEstado(nuevoEstado) {
    estadoIntro = nuevoEstado;
    inicioEstado = millis();

    if (nuevoEstado === "abriendo") {
        opacidad = 0;
    }
}

function mostrarPapiro() {

    let sprite = papiroCerrar[papiroCerrar.length - 1];

    if (estadoIntro === "abriendo") {
        sprite = animacionPapiro(papiroAbrir);
    } else if (estadoIntro === "cerrando") {
        sprite = animacionPapiro(papiroCerrar);
    } else if (estadoIntro === "mostrandoTexto" || estadoIntro === "esperandoTexto") {
        sprite = papiroAbrir[papiroAbrir.length - 1];
    }

    image(sprite, 0, posYPapiro, 800, 450);

}

function animacionPapiro(accion) {
    let tiempo = millis() - inicioEstado;
    let indice = floor(tiempo / duracionSprite);
    if (indice >= accion.length) {
        indice = accion.length - 1; // muestro el ultimo sprite del array
    }
    return accion[indice];
}

function mostrarTextoIntro(etapa) {
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(0, opacidad);

    if (etapa === 1) {
        text("GrUpo", 400, 215);
        fill(207, 0, 3, opacidad);
        text("Tomás LUcca y Leandro Amandy", 400, 240);

    } else if (etapa === 2) {
        text("Materia", 400, 165);
        fill(207, 0, 3, opacidad);
        textSize(14);
        text("Programación para medios interactivos", 400, 195);
        text("orientado a las tecnologías web", 400, 220);
        textSize(16);
        fill(0, opacidad);
        text("Profesor", 290, 270);
        text("Comisión", 450, 270);
        text("Año", 550, 270);
        fill(207, 0, 3, opacidad);
        textSize(14);
        text("Leonardo Garay", 290, 300);
        text("5", 450, 300);
        text("2026", 550, 300);

    } else if (etapa === 3) {
        text("Libro", 400, 175);
        fill(207, 0, 3, opacidad);
        text("El secreto de las pirámides", 400, 205);
        fill(0, opacidad);
        text("AUtor", 400, 265);
        fill(207, 0, 3, opacidad);
        text("Brightfield Richard", 400, 295);
    }
}
