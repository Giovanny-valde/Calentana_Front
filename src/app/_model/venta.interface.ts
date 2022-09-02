export interface Venta {
  Tienda: Tienda;
  Tradicional: number;
  Mega: number;
  Devolucion: number;
  Fecha: string;
  Ruta: Ruta;
  Total: number
}

interface Tienda {
  Id: string;
  Nombre: string;
}

interface Ruta {
  Id: string;
  Nombre: string;
}
