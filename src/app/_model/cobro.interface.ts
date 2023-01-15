import { Tienda } from './tienda.interface';

export interface Cobro {
    Id: string;
    Tienda: Tienda,
    Valor : number,
    Fecha?: Date,
    Pago : boolean
}
