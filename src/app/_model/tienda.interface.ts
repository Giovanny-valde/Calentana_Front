import { Ruta } from 'src/app/_model/ruta.interface';
export interface Tienda {
    Id: string;
    Nombre: string,
    Dueno: string,
    Nit: string,
    Telefono: string,
    Direccion: string,
    Ruta: Ruta
}
