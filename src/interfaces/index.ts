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