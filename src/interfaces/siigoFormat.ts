import { getCodesByName, getCategoryCode } from "../utils/functions.utils.ts";

/*
TIPO_DE_COMPROBANTE: string;         // len 1 (F, G o P)
    CODIGO_COMPROBANTE: number;          // len 3
    NUMERO_DE_DOCUMENTO: number;         // len 11
    CUENTA_CONTABLE: number;             // len 10
    DEBITO_O_CREDITO: string;            // len 1
    VALOR_DE_LA_SECUENCIA: number;       // len 13 y 2 decimales
    ANNO_DEL_DOCUMENTO: number;          // len 4
    MES_DEL_DOCUMENTO: number;           // len 2
    DIA_DEL_DOCUMENTO: number;           // len 2
    SECUENCIA: number;                   // len 5
    CENTRO_DE_COSTO: number;             // len 4
    NIT: number;                         // len 13 (sin digito de verificacion)
    DESCRIPCION_DE_LA_SECUENCIA: string; // len 50
    LINEA_PRODUCTO: number;              // len 3
    GRUPO_PRODUCTO: number;              // len 4
    CODIGO_PRODUCTO: number;             // len 6
    CANTIDAD: number;                    // len 13 y 5 decimales
    CODIGO_DE_LA_BODEGA: number;         // len 4
    CLASIFICACION_1: string;             // len 10
    CLASIFICACION_2: string;             // len 8
*/

export class SiigoFormat {
    TIPO_DE_COMPROBANTE: string;
    CODIGO_COMPROBANTE: number;
    NUMERO_DE_DOCUMENTO: number;
    CUENTA_CONTABLE: number;
    DEBITO_O_CREDITO: string;
    VALOR_DE_LA_SECUENCIA: number;
    ANNO_DEL_DOCUMENTO: number;
    MES_DEL_DOCUMENTO: number;
    DIA_DEL_DOCUMENTO: number;
    SECUENCIA: number;
    CENTRO_DE_COSTO: number;
    NIT: number;
    DESCRIPCION_DE_LA_SECUENCIA: string;
    LINEA_PRODUCTO: number;
    GRUPO_PRODUCTO: number;
    CODIGO_PRODUCTO: number;
    CANTIDAD: number;
    CODIGO_DE_LA_BODEGA: number;
    CLASIFICACION_1: string;
    CLASIFICACION_2: string;

    constructor(
        CUENTA_CONTABLE: number,
        DEBITO_O_CREDITO: string,
        DESCRIPCION_DE_LA_SECUENCIA: string,
        CANTIDAD: number,
        CODIGO_DE_LA_BODEGA: number,
        CLASIFICACION_1: string
    ) {
        this.TIPO_DE_COMPROBANTE = 'O';
        this.CODIGO_COMPROBANTE = 1;
        this.NUMERO_DE_DOCUMENTO = 0;
        this.CUENTA_CONTABLE = CUENTA_CONTABLE;
        this.DEBITO_O_CREDITO = DEBITO_O_CREDITO;
        this.VALOR_DE_LA_SECUENCIA = 0;
        this.ANNO_DEL_DOCUMENTO = new Date().getFullYear();
        this.MES_DEL_DOCUMENTO = new Date().getMonth() + 1;
        this.DIA_DEL_DOCUMENTO = new Date().getDate();
        this.SECUENCIA = 0;
        this.CENTRO_DE_COSTO = 1;
        this.NIT = 900130065;
        this.DESCRIPCION_DE_LA_SECUENCIA = DESCRIPCION_DE_LA_SECUENCIA;
        this.LINEA_PRODUCTO = 0;
        this.GRUPO_PRODUCTO = 0;
        this.CODIGO_PRODUCTO = 0;
        this.CANTIDAD = CANTIDAD ?? 0;
        this.CODIGO_DE_LA_BODEGA = CODIGO_DE_LA_BODEGA;
        this.CLASIFICACION_1 = CLASIFICACION_1;
        this.CLASIFICACION_2 = '0';
    }
    setCodigosSiigo(desct: string, type: string) {
        const {linea_producto, grupo_producto, codigo_producto} = getCodesByName(desct, type);
        this.LINEA_PRODUCTO = type === 'Códigos Terminados' ? 2 : parseInt(linea_producto === '' ? '0' : linea_producto);
        this.GRUPO_PRODUCTO = parseInt(grupo_producto === '' ? '0' : grupo_producto);
        this.CODIGO_PRODUCTO = parseInt(codigo_producto === '' ? '0' : codigo_producto);
    }
    setCodigoBodega(value: string) {
        const pathfile = 'uploads/BODEGAS.json';
        const code = getCategoryCode(value, pathfile);
        this.CODIGO_DE_LA_BODEGA = parseInt(code);
    }
    setTalla(value: string) {
        const pathfile = 'uploads/TALLA.json';
        const code = getCategoryCode(value, pathfile);
        this.CLASIFICACION_1 = code;
    }
    setColor(value: string) {
        const pathfile = 'uploads/COLORES.json';
        const code = getCategoryCode(value, pathfile);
        this.CLASIFICACION_2 = code;
    }

    // Setters & Getters
    setTipoComprobante(value: string) {this.TIPO_DE_COMPROBANTE = value;}
    
    setCodigoComprobante(value: number) {this.CODIGO_COMPROBANTE = value;}

    setNumeroDocumento(value: number) {this.NUMERO_DE_DOCUMENTO = value;}

    setCuentaContable(value: number) {this.CUENTA_CONTABLE = value;}

    setDebitoCredito(value: string) {this.DEBITO_O_CREDITO = value;}

    setValorSecuencia(value: number) {this.VALOR_DE_LA_SECUENCIA = value;}

    setAnnoDocumento(value: number) {this.ANNO_DEL_DOCUMENTO = value;}

    setMesDocumento(value: number) {this.MES_DEL_DOCUMENTO = value;}

    setDiaDocumento(value: number) {this.DIA_DEL_DOCUMENTO = value;}

    setSecuencia(value: number) {this.SECUENCIA = value;}

    setCentroCosto(value: number) {this.CENTRO_DE_COSTO = value;}

    setNIT(value: number) {this.NIT = value;}

    setDescripcion(value: string) {this.DESCRIPCION_DE_LA_SECUENCIA = value;}

    setLineaProducto(value: number) {this.LINEA_PRODUCTO = value;}

    setGrupoProducto(value: number) {this.GRUPO_PRODUCTO = value;}

    setCodigoProducto(value: number) {this.CODIGO_PRODUCTO = value;}

    setCantidad(value: number) {this.CANTIDAD = value;}

    


    getTipoComprobante() {return this.TIPO_DE_COMPROBANTE;}
    
    getCodigoComprobante() {return this.CODIGO_COMPROBANTE;}

    getNumeroDocumento() {return this.NUMERO_DE_DOCUMENTO;}

    getCuentaContable() {return this.CUENTA_CONTABLE;}

    getDebitoCredito() {return this.DEBITO_O_CREDITO;}

    getValorSecuencia() {return this.VALOR_DE_LA_SECUENCIA;}

    getAnnoDocumento() {return this.ANNO_DEL_DOCUMENTO;}

    getMesDocumento() {return this.MES_DEL_DOCUMENTO;}

    getDiaDocumento() {return this.DIA_DEL_DOCUMENTO;}

    getSecuencia() {return this.SECUENCIA;}

    getCentroCosto() {return this.CENTRO_DE_COSTO;}

    getNIT() {return this.NIT;}

    getDescripcion() {return this.DESCRIPCION_DE_LA_SECUENCIA;}

    getLineaProducto() {return this.LINEA_PRODUCTO;}

    getGrupoProducto() {return this.GRUPO_PRODUCTO;}

    getCodigoProducto() {return this.CODIGO_PRODUCTO;}

    getCantidad() {return this.CANTIDAD;}

    getCodigoBodega() {return this.CODIGO_DE_LA_BODEGA;}

    getTalla() {return this.CLASIFICACION_1;}

    getColor() {return this.CLASIFICACION_2;}
}
