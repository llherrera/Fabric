import { SiigoFormat } from './siigoFormat.ts';

export * from './siigoFormat.ts';

export interface JSONInterface {
    [key:string]: string[];
}

export interface JSONInterfaceData {
    [key:string]: string;
}

export interface JSONInterfaceExcel {
    [key:string]: JSONInterfaceData[];
}

export interface JSONInterfaceFormat {
    [key:string]: SiigoFormat[]
}

export interface JSONEquivalencia {
    [key: string]: JSONInterface;
}

export interface ResponseCodesByName {
    linea_producto: string;
    grupo_producto: string;
    codigo_producto: string;
}