class Tablero {
    constructor() {
        this.columnas = 8;
        this.filas = 5;
        this.tamanoBaldosa = 60;
        this.posX = 160;
        this.posY = 75;
        this.baldosas = [];
        this.caminoSeguro = [];
        this.crearBaldosas();
    }

    crearBaldosas() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                let posX = this.posX + columna * this.tamanoBaldosa;
                let posY = this.posY + fila * this.tamanoBaldosa;
                let nuevaBaldosa = new Baldosa(columna, fila, posX, posY, this.tamanoBaldosa);
                this.baldosas.push(nuevaBaldosa);
            }
        }
    }

    reiniciarCaminoSeguro() {
        this.caminoSeguro = [];
        for (let i = 0; i < this.baldosas.length; i++) {
            this.baldosas[i].segura = false;
        }

    }

    generarCaminoSeguro() {
        this.reiniciarCaminoSeguro();

        let filaActualDelCamino = int(random(this.filas));
        
        let primeraColumnaParaCambiarFila = int(random(1, 3)); // elijo 2 columnas para subir o bajar una baldosa.
        let segundaColumnaParaCambiarFila = int(random(4, 7));

        for (let columnaActual = 0; columnaActual < this.columnas; columnaActual++) {
            let indiceBaldosaActual = filaActualDelCamino * this.columnas + columnaActual;
            let baldosaActual = this.baldosas[indiceBaldosaActual];

            this.caminoSeguro.push(baldosaActual);

            // pregunto si estoy en alguna de las columnas elegidas para subir o bajar una baldosa.
            if (columnaActual === primeraColumnaParaCambiarFila || columnaActual === segundaColumnaParaCambiarFila) {

                let pasoVertical = int(random(3)) - 1; // -1 = subir; 0 = seguir derecho; 1 = bajar.
                let filaSiguiente = filaActualDelCamino + pasoVertical;

                if (pasoVertical !== 0 && filaSiguiente >= 0 && filaSiguiente < this.filas) {
                    let indiceBaldosaVecina = filaSiguiente * this.columnas + columnaActual;
                    let baldosaVecina = this.baldosas[indiceBaldosaVecina];
                    this.caminoSeguro.push(baldosaVecina);
                    filaActualDelCamino = filaSiguiente;
                }
            }
        }

        for (let i = 0; i < this.caminoSeguro.length; i++) {
            this.caminoSeguro[i].segura = true;
        }

    }

    buscarBaldosaBajoMouse() {
        for (let i = 0; i < this.baldosas.length; i++) {
            if (this.baldosas[i].mouseEncima()) {
                return this.baldosas[i];
            }
        }
        return null;
    }

    mostrar(mostrarCamino, destacar, personaje) {
        for (let i = 0; i < this.baldosas.length; i++) {
            let baldosa = this.baldosas[i];
            let destacarBaldosa = false;

            if (destacar && baldosa.mouseEncima()) {
                destacarBaldosa = personaje.puedeMoverseA(baldosa);
            }
            baldosa.mostrar(mostrarCamino, destacarBaldosa);
        }
    }
}

