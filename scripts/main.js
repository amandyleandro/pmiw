let fondo;
let papiroAbrir = [];
let papiroCerrar = [];
let estadoIntro = "apareciendo";
let inicioEstado = 0;

let fuente;
let textos = [];
let textosBTN = [];
let escenas = [];

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
