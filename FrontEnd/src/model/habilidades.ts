export class Habilidades {
    id?: number;
    nombreH: string;
    porcentajeH: string;
    imagenH: string;

    constructor(nombreH: string, porcentajeH: string, imagenH: string) {
        this.nombreH = nombreH;
        this.porcentajeH = porcentajeH;
        this.imagenH = imagenH;
    }
}
