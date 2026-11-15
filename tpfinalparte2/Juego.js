class Juego {
    constructor() {
        this.tablero = new Tablero();
        this.personaje = new Personaje();
        this.estado = "menu";
        this.inicioMemorizacion = -1;
        this.duracionMemorizacion = 3000; // tres segundos.

        this.sonidoAmbiente = null;
        this.sonidoClic = null;
        this.sonidoPasoSeguro = null;
        this.sonidoCaida = null;
    }

    cargarRecursos() {
        this.imagenMenu = loadImage("imagenes/Menu.png");
        this.imagenVictoria = loadImage("imagenes/ganaste.png");
        this.imagenDerrota = loadImage("imagenes/perdiste.png");
        this.imagenSala = loadImage("imagenes/salaCamino.jpeg");
        this.imagenInstrucciones = loadImage("imagenes/instrucciones.png");
        this.imagenPersonaje = loadImage("imagenes/personaje.png");

        this.sonidoAmbiente = loadSound("sonidos/ambiente.mp3");
        this.sonidoClic = loadSound("sonidos/clic.mp3");
        this.sonidoPasoSeguro = loadSound("sonidos/pasoSeguro.mp3");
        this.sonidoCaida = loadSound("sonidos/caida.mp3");
    }

    mostrarPantalla() {
        if (this.estado === "menu") {
            this.menu();
        } else if (this.estado === "memorizacion" || this.estado === "cruce") {
            this.mostrarPartida();
        } else if (this.estado === "victoria") {
            this.mostrarVictoria();
        } else if (this.estado === "derrota") {
            this.mostrarDerrota();
        } else if (this.estado === "creditos") {
            this.mostrarCreditos();
        } else if (this.estado === "instrucciones") {
            this.mostrarInstrucciones();
        }
    }

    menu() {
        image(this.imagenMenu, 0, 0, 800, 450);
        let posX = 300;
        let posY = 265;
        let ancho = 200;
        let alto = 50;

        // btn comenzar
        stroke(225, 195, 120);
        strokeWeight(2);
        if (this.mouseSobreComenzar()) {
            fill(70, 65, 100);
        } else {
            fill(30, 25, 55);
        }
        rect(posX, posY, ancho, alto);

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(22);
        text("Comenzar", posX + ancho / 2, posY + alto / 2);

        let posYInstrucciones = 325;
        stroke(225, 195, 120);
        strokeWeight(2);
        if (this.mouseSobreInstrucciones()) {
            fill(70, 65, 100);
        } else {
            fill(30, 25, 55);
        }
        rect(posX, posYInstrucciones, ancho, alto);
        noStroke();
        fill(255);
        textSize(22);
        text("Instrucciones", posX + ancho / 2, posYInstrucciones + alto / 2);

        // btn creditos 
        noStroke();
        if (this.mouseSobreCreditos()) {
            fill(245, 215, 145);
        } else {
            fill(255);
        }
        textSize(20);
        text("Créditos", 400, 398);

        if (this.mouseSobreCreditos()) {
            stroke(245, 215, 145);
        } else {
            stroke(255);
        }
        strokeWeight(1);
        line(360, 411, 440, 411);
        noStroke();
    }

    detectarClic() {
        this.reproducirSonidoAmbiente();
        let hizoClicEnBoton = false;

        if (this.estado === "menu") {
            if (this.mouseSobreComenzar()) {
                this.comenzar();
                hizoClicEnBoton = true;
            } else if (this.mouseSobreInstrucciones()) {
                this.estado = "instrucciones";
                hizoClicEnBoton = true;
            } else if (this.mouseSobreCreditos()) {
                this.estado = "creditos";
                hizoClicEnBoton = true;
            }
        } else if (this.estado === "derrota") {
            if (this.mouseSobreReintentar()) {
                this.comenzar();
                hizoClicEnBoton = true;
            } else if (this.mouseSobreVolverAlMenu()) {
                this.volverAlMenu();
                hizoClicEnBoton = true;
            }
        } else if (this.estado === "victoria" || this.estado === "creditos" || this.estado === "instrucciones") {
            if (this.mouseSobreVolverAlMenu()) {
                this.volverAlMenu();
                hizoClicEnBoton = true;
            }
        } else if (this.estado === "cruce") {
            let baldosaSeleccionada = this.tablero.buscarBaldosaBajoMouse();

            if (baldosaSeleccionada !== null && this.personaje.puedeMoverseA(baldosaSeleccionada)) {
                this.personaje.moverA(baldosaSeleccionada);

                // sonido de los pasos
                if (baldosaSeleccionada.segura === false) {
                    this.reproducirSonidoCaida();
                    this.estado = "derrota";
                } else {
                    this.reproducirSonidoPasoSeguro();
                    if (baldosaSeleccionada.columna === this.tablero.columnas - 1) {
                        this.estado = "victoria";
                    }
                }
            }
        }

        if (hizoClicEnBoton) {
            this.reproducirSonidoClick();
        }
    }

    mostrarVictoria() {
        image(this.imagenVictoria, 0, 0, 800, 450);
        this.mostrarTextoCreditos();
        this.mostrarBotonVolverAlMenu();
    }

    mostrarDerrota() {
        image(this.imagenDerrota, 0, 0, 800, 450);

        let textoBoton = "Volver a intentarlo";
        let posXBoton = 30;
        let destacarBoton = this.mouseSobreReintentar();
        this.mostrarBotonResultado(textoBoton, posXBoton, destacarBoton);
        this.mostrarBotonVolverAlMenu();
    }

    mostrarInstrucciones() {
        image(this.imagenInstrucciones, 0, 0, 800, 450);
        this.mostrarBotonVolverAlMenu();
    }

    mostrarCreditos() {
        image(this.imagenMenu, 0, 0, 800, 450);
        this.mostrarTextoCreditos();
        this.mostrarBotonVolverAlMenu();
    }

    mostrarTextoCreditos() {
        let tamTitulo = 24;
        let tamSubtitulo = 14;
        let tamTexto = 17;
        noStroke();
        fill(20, 15, 30, 165);
        rect(150, 132, 500, 200);
        textAlign(CENTER, CENTER);

        fill(245, 215, 145);
        textSize(tamTitulo);
        text("Créditos", 400, 151);

        textSize(tamSubtitulo);
        text("Juego realizado por", 400, 180);
        fill(255);
        textSize(tamTexto);
        text("Tomás Lucca y Leandro Amandy", 400, 201);

        fill(245, 215, 145);
        textSize(tamSubtitulo);
        text("Para la materia", 400, 228);
        fill(255);
        textSize(tamTexto);
        text("Programación para medios interactivos", 400, 248);
        text("orientado a las tecnologías web", 400, 268);

        fill(255);
        textSize(tamTexto);
        text("Comisión - 5", 300, 307);
        text("Año - 2026", 500, 307);
    }

    mostrarBotonVolverAlMenu() {
        let textoBoton = "Volver al menu";
        let posXBoton = 550;
        let destacarBoton = this.mouseSobreVolverAlMenu();
        this.mostrarBotonResultado(textoBoton, posXBoton, destacarBoton);
    }

    mostrarBotonResultado(textoBoton, posX, destacarBoton) {
        let posY = 370;
        let ancho = 220;
        let alto = 50;

        stroke(225, 195, 120);
        strokeWeight(2);
        if (destacarBoton) {
            fill(70, 65, 100);
        } else {
            fill(30, 25, 55);
        }
        rect(posX, posY, ancho, alto);

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(18);
        text(textoBoton, posX + ancho / 2, posY + alto / 2);
    }

    volverAlMenu() {
        this.estado = "menu";
    }

    comenzar() {
        this.tablero.generarCaminoSeguro();
        this.personaje.reiniciar();
        this.inicioMemorizacion = -1;
        this.estado = "memorizacion";
    }

    mostrarPartida() {
        if (this.estado === "memorizacion" && this.inicioMemorizacion !== -1) {
            if (millis() - this.inicioMemorizacion >= this.duracionMemorizacion) {
                this.estado = "cruce";
            }
        }

        image(this.imagenSala, -15, -40, 830, 500);
        let mostrarCamino = this.estado === "memorizacion";
        let destacar = this.estado === "cruce";
        this.tablero.mostrar(mostrarCamino, destacar, this.personaje);
        this.personaje.mostrar(this.imagenPersonaje);

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(18);
        if (this.estado === "memorizacion") {
            text("Tenes 3 segundos para memorizar el camino", 400, 40);
        } else {
            text("Avanzá en el camino seguro", 400, 40);
        }

        if (this.estado === "memorizacion" && this.inicioMemorizacion === -1) {
            this.inicioMemorizacion = millis();
        }
    }

    
    reproducirSonidoAmbiente() {
        if (this.sonidoAmbiente.isLoaded() && !this.sonidoAmbiente.isPlaying()) {
            this.sonidoAmbiente.setVolume(0.3);
            this.sonidoAmbiente.loop();
        }
    }

    reproducirSonidoClick() {
        if (this.sonidoClic.isLoaded()) {
            this.sonidoClic.play();
        }
    }

    reproducirSonidoPasoSeguro() {
        if (this.sonidoPasoSeguro.isLoaded()) {
            this.sonidoPasoSeguro.play();
        }
    }

    reproducirSonidoCaida() {
        if (this.sonidoCaida.isLoaded()) {
            this.sonidoCaida.play();
        }
    }

    mouseSobreVolverAlMenu() {
        return mouseX >= 550 && mouseX < 770 && mouseY >= 370 && mouseY < 420;
    }

    mouseSobreReintentar() {
        return mouseX >= 30 && mouseX < 250 && mouseY >= 370 && mouseY < 420;
    }

    mouseSobreComenzar() {
        return mouseX >= 300 && mouseX < 500 && mouseY >= 265 && mouseY < 315;
    }

    mouseSobreInstrucciones() {
        return mouseX >= 300 && mouseX < 500 && mouseY >= 325 && mouseY < 375;
    }

    mouseSobreCreditos() {
        return mouseX >= 350 && mouseX < 450 && mouseY >= 382 && mouseY < 418;
    }


}
