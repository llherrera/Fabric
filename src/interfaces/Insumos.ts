export interface Insumos {
    Fecha: string;
    Descripcion: string;
    COLOR: string;
    'REF LIDER': string;
    Taller: string;
    Cantidad: string;
}

export interface Telas {
    Fecha: string;
    "Nombre de la Tela": string;
    Color: string;
    Cantidad: string;
    "Referencia Producto terminado": string;
}

export interface Producto extends Insumos, Telas {
}