export class Repartidor {
    id: string;
    nombre: string;
    edad:number;
    capacidadTransporte:number;
    pais: string;
    unidadPropia:boolean;

    constructor(
        id: string,
        nombre: string,
        edad: number,
        capacidadTransporte:number,
        pais: string,
        unidadPropia: boolean
    ) {
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.capacidadTransporte = capacidadTransporte;
        this.unidadPropia = unidadPropia;
        this.edad = edad;
    }
}

/* 
un repartidor,(dni , nombre, edad,capacidad de transporte(unidades de potes de helados), país de origen,unidad
Propia (true o false)).
*/
