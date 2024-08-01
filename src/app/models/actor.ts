export class Actor {
    id: string;
    nombre: string;
    pais: string;
    foto:string;

    constructor(
        id: string,
        nombre: string,
        pais: string,
        foto: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.foto = foto;
    }
}
