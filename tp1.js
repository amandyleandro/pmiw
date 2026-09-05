let fondo; let mesa;
let xFondo = 0; let xMesa = 616;

let recargar; let caminar; let quieto; let disparar; let muerte;
let gangster1 = "recargar"; let xPj1 = 297; let yPj1 = 315;

let quieto2; let muerte2;
let gangster2 = "quieto2"; let xPj2 = 1100;

let quieto3; let disparar3;
let gangster3 = "quieto3"; let xPj3 = 1100;

let velocidad = 1.5;
let contador1 = 0;
let contador2 = 0;
let contador3 = 0;
let contadorGral = 0;
let frame; let frame2; let frame3;
let frames1 = []; let frames2 = []; let frames3 = [];

function preload() {
    fondo = loadImage("./imagenes/fondo.png");
    mesa = loadImage("./imagenes/mesa.png");
    
    // GANGSTER 1
    caminar = cargarAccion("gangster1","caminar", 10);
    recargar = cargarAccion("gangster1","recargar", 20);
    quieto = cargarAccion("gangster1","quieto", 6);
    disparar = cargarAccion("gangster1","disparar", 4);
    muerte = cargarAccion("gangster1","muerte", 10);
    
    // GANGSTER 2
    quieto2 = cargarAccion("gangster2","quieto2", 13);
    muerte2 = cargarAccion("gangster2","muerte2", 6);

    // GANGSTER 3
    quieto3 = cargarAccion("gangster3","quieto3", 7);
    disparar3 = cargarAccion("gangster3","disparar3", 36);
}

function setup() {
    createCanvas(800, 600);
}

    
function draw() {
    contadorGral++;

    image(fondo, xFondo, 0, 1570, 600);

    actualizarEstado();
    movimientoFondoYPj();

    frameGangster1();
    frameGangster2();
    frameGangster3();

    image(mesa, xMesa, 425, 226, 144);
}

// ----------------------------------   FUNCIONES   -----------------------------------------

function cargarAccion(pj, accion, cantidad) {
    let frames = [];
    for (let i = 0; i < cantidad; i++) {
        frames.push(loadImage(`./imagenes/${pj}/${accion}_${i}.png`));
    }
    return frames;
}

function elegirFrame(frames, velocidadAnimacion, contador) {
    let indice = floor(contador / velocidadAnimacion) % frames.length;
    return frames[indice];
}

function framesDelEstado(estado) {
    if (estado === "caminar") {
        return caminar;
    } else if (estado === "recargar") {
        return recargar;
    } else if (estado === "quieto") {
        return quieto;
    } else if (estado === "disparar") {
        return disparar;
    } else if (estado === "muerte") {
        return muerte;
    } else if (estado === "quieto2") {
        return quieto2;
    } else if (estado === "muerte2") {
        return muerte2;
    } else if (estado === "quieto3") {
        return quieto3;
    } else if (estado === "disparar3") {
        return disparar3;
    }
}

function actualizarEstado(){
    contador1++;
    contador2++;
    contador3++;

    if (gangster1 === "recargar" && contador1 > 160) {
        gangster1 = "caminar";
        contador1 = 0;
    }
    if (gangster1 === "caminar" && contador1 === 400) {
        gangster1 = "quieto";
        contador1 = 0;
    }
    if (gangster1 === "quieto" && contador1 === 260) {
        gangster1 = "disparar";
        contador1 = 0;
    }
    if (gangster1 === "disparar" && contador1 === 15) {
        gangster2 = "muerte2";
        contador2 = 0;
    }
    if (gangster1 === "disparar" && contador1 === 60) {
        gangster3 = "disparar3";
        contador3 = 0;
    }
    if (gangster3 === "disparar3" && contador3 === 20) {
        gangster1 = "muerte";
        contador1 = 0;
    }
}

function calculoVelocidadAnimacion(estado) {
    if (estado === "caminar" || estado === "recargar") {
        return 8;
    } else if (estado === "quieto" || estado === "quieto2" || estado === "quieto3") {
        return 11;
    } else if (estado === "disparar") {
        return 4;
    } else if (estado === "disparar3") {
        return 6;
    } else if (estado === "muerte" || estado === "muerte2"){
        return 15;
    }
    return 8; // fallback seguro por si llega un estado no definido
}

function frameGangster1() {
    if (gangster1 !== "fin") {
        frames1 = framesDelEstado(gangster1);
        frame = elegirFrame(frames1, calculoVelocidadAnimacion(gangster1), contador1);
        ajusteDePosicionPj();
        if (gangster1 === "muerte" && frame === frames1[frames1.length - 1] ) { // SI ES EL ULTIMO FRAME DE MUERTE, MANTENERLO FIJO
            frame = muerte[muerte.length - 1];
            gangster1 = "fin";
        }
    }
    image(frame, xPj1, yPj1, frame.width * 1.1, frame.height * 1.1);
}

function frameGangster2() {
    if (gangster2 !== "fin") {
        frames2 = framesDelEstado(gangster2);
        frame2 = elegirFrame(frames2, calculoVelocidadAnimacion(gangster2), contador2);
        if (gangster2 === "muerte2" && frame2 === frames2[frames2.length - 1] ) { // SI ES EL ULTIMO FRAME DE MUERTE, MANTENERLO FIJO
            frame2 = muerte2[muerte2.length - 1];
            gangster2 = "fin";
        }
    }
    image(frame2, xPj2, 310, frame2.width * 1.1, frame2.height * 1.1);
}

function frameGangster3() {
     if (gangster3 !== "fin") {
         frames3 = framesDelEstado(gangster3);
         frame3 = elegirFrame(frames3, calculoVelocidadAnimacion(gangster3), contador3);
        if (gangster3 === "disparar3" && frame3 === frames3[frames3.length - 1] ) { // SI ES EL ULTIMO FRAME DE DISPARAR, MANTENERLO FIJO
            frame3 = disparar3[disparar3.length - 1];
            gangster3 = "fin";
        }
    }
    image(frame3, xPj3, 315, frame3.width * 1.1, frame3.height * 1.1);
}

function movimientoFondoYPj() {
        if (gangster1 === 'caminar' && xPj1 < 500) {
        xPj1 += velocidad;
    }
    
    if (contadorGral > 250 && xFondo >= -770) {
        xFondo -= velocidad;
        xPj1 -= velocidad;
        xMesa -= velocidad;
        xPj2 -= velocidad;
        xPj3 -= velocidad;
    }
}

function ajusteDePosicionPj() {
    if (gangster1 === 'disparar') { // Ajuste de posición para la animación de disparo X DESFASE EN LOS FRAMES
        yPj1 = 297.5;
        xPj1 = 117.5;
    } else if (gangster1 === 'muerte') { // Ajuste de posición para la animación de muerte X DESFASE EN LOS FRAMES
        yPj1 = 306;
        xPj1 = 115.5;
    } else{
        yPj1 = 315;
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') { // 'r' o 'R' para reiniciar la animación
        reiniciarAnimacion();
    }
}

function reiniciarAnimacion() {
    gangster1 = "recargar";
    gangster2 = "quieto2";
    gangster3 = "quieto3";
    frames1 = [];
    frames2 = [];
    frames3 = [];

    xFondo = 0;
    xMesa = 616;
    xPj1 = 297;
    yPj1 = 315;
    xPj2 = 1100;
    xPj3 = 1100;

    contador1 = 0;
    contador2 = 0;
    contador3 = 0;
    contadorGral = 0;
}