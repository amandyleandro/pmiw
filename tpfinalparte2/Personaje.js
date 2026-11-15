class Personaje {
    constructor() {
        this.ancho = 67;
        this.alto = 61;
        this.columna = -1;
        this.fila = -1;
        this.posX = 100;
        this.posY = 225;
    }

    reiniciar() {
        this.columna = -1;
        this.fila = -1;
        this.posX = 100;
        this.posY = 225;
    }

    puedeMoverseA(baldosa) {
        if (this.columna === -1) {
            return baldosa.columna === 0;
        }

        if (baldosa.fila === this.fila && baldosa.columna === this.columna + 1) {
            return true;
        }

        if (baldosa.fila === this.fila && baldosa.columna === this.columna - 1) {
            return true;
        }

        if (baldosa.columna === this.columna && baldosa.fila === this.fila - 1) {
            return true;
        }

        if (baldosa.columna === this.columna && baldosa.fila === this.fila + 1) {
            return true;
        }

        return false;
    }

    moverA(baldosa) {
        this.columna = baldosa.columna;
        this.fila = baldosa.fila;
        this.posX = baldosa.posX + baldosa.tamanoBaldosa / 2;
        this.posY = baldosa.posY + baldosa.tamanoBaldosa / 2;
    }

    mostrar(imagenPersonaje) {
        let posX = this.posX - this.ancho / 2;
        let posY = this.posY - this.alto / 2;
        image(imagenPersonaje, posX, posY, this.ancho, this.alto);
    }
}
