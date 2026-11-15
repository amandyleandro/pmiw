let juego;

function preload() {
    juego = new Juego();
    juego.cargarRecursos();
}

function setup() {
    createCanvas(800, 450);
    juego.reproducirSonidoAmbiente();
}

function draw() {
    juego.mostrarPantalla();
}

function mousePressed() {
    juego.detectarClic();
}


