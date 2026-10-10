let posYPapiro = 450;
const velocidadPapiro = 5.5;
const duracionSprite = 130;
const esperaApertura = 1000;

let opacidad = 0;
let etapaTexto = 1;
const velocidadOpacidad = 5.5;
const esperaTexto = 2800;

// ----------------------------------   FUNCIONES   -----------------------------------------


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
