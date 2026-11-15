class Baldosa {
    constructor(columna, fila, posX, posY, tamanoBaldosa) {
        this.columna = columna;
        this.fila = fila;
        this.posX = posX;
        this.posY = posY;
        this.tamanoBaldosa = tamanoBaldosa;
        this.segura = false;
    }

    mouseEncima() {
        return mouseX >= this.posX && mouseX < this.posX + this.tamanoBaldosa && mouseY >= this.posY && mouseY < this.posY + this.tamanoBaldosa;
    }

    mostrar(mostrarCamino, destacarBaldosa) {
        if (destacarBaldosa) {
            stroke(255, 240, 160);
            strokeWeight(4);
        } else {
            noStroke();
        }

        if (mostrarCamino && this.segura) {
            fill(100, 210, 240, 190);
        } else {
            fill(155, 135, 100, 190);
        }

        rect(this.posX + 2, this.posY + 2, this.tamanoBaldosa - 4, this.tamanoBaldosa - 4);
    }
}


