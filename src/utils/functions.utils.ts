import { SiigoFormat1 } from "../interfaces/index.ts";
import ExcelJS, { Row, Cell } from 'exceljs';
import fs from 'fs';
import { diceCoefficient } from 'dice-coefficient';

interface Props {
    [key:string]: string[];
}


export const validateLength = (value: string, len: number) => {
    return value.length === len;
}

export const validateDecimals = (value: number, intergersCount: number, decimalsCount: number) => {
    const valorString = value.toString();
    const partes = valorString.split('.');
    if (partes[0].length > intergersCount) return false;
    if (partes[1] && partes[1].length > decimalsCount) return false;
    return true;
}

export const validateNIT = (value: string | number, len: number) => {
    return true; // To Do: cambiar segun requerimiento
}

export const validateCode = (value: string) => {
    const regex: RegExp = /^[A-Z]-\d{3}$/;
    return regex.test(value)
}

export const validateLetter = (value: string, values: string[]) => {
    return values.includes(value);
}

export const generateExcel1 = async (data: SiigoFormat1[]): Promise<string> => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    worksheet.columns = [
        { header: 'TIPO_DE_COMPROBANTE_OBLIGATORIO', key: 'TIPO_DE_COMPROBANTE_OBLIGATORIO', width: 20 },
        { header: 'CODIGO_COMPROBANTE_OBLIGATORIO', key: 'CODIGO_COMPROBANTE_OBLIGATORIO', width: 20 },
        { header: 'NUMERO_DE_DOCUMENTO', key: 'NUMERO_DE_DOCUMENTO', width: 20 },
        { header: 'CUENTA_CONTABLE_OBLIGATORIO', key: 'CUENTA_CONTABLE_OBLIGATORIO', width: 20 },
        { header: 'DEBITO_O_CREDITO_OBLIGATORIO', key: 'DEBITO_O_CREDITO_OBLIGATORIO', width: 20 },
        { header: 'VALOR_DE_LA_SECUENCIA_OBLIGATORIO', key: 'VALOR_DE_LA_SECUENCIA_OBLIGATORIO', width: 20 },
        { header: 'ANIO_DEL_DOCUMENTO', key: 'ANIO_DEL_DOCUMENTO', width: 20 },
        { header: 'MES_DEL_DOCUMENTO', key: 'MES_DEL_DOCUMENTO', width: 20 },
        { header: 'DIA_DEL_DOCUMENTO', key: 'DIA_DEL_DOCUMENTO', width: 20 },
        { header: 'CODIGO_DEL_VENDEDOR', key: 'CODIGO_DEL_VENDEDOR', width: 20 },
        { header: 'CODIGO_DE_LA_CIUDAD', key: 'CODIGO_DE_LA_CIUDAD', width: 20 },
        { header: 'CODIGO_DE_LA_ZONA', key: 'CODIGO_DE_LA_ZONA', width: 20 },
        { header: 'SECUENCIA', key: 'SECUENCIA', width: 20 },
        { header: 'CENTRO_DE_COSTO', key: 'CENTRO_DE_COSTO', width: 20 },
        { header: 'SUBCENTRO_DE_COSTO', key: 'SUBCENTRO_DE_COSTO', width: 20 },
        { header: 'NIT', key: 'NIT', width: 20 },
        { header: 'SUCURSAL', key: 'SUCURSAL', width: 20 },
        { header: 'DESCRIPCION_DE_LA_SECUENCIA', key: 'DESCRIPCION_DE_LA_SECUENCIA', width: 20 },
        { header: 'NUMERO_DE_CHEQUE', key: 'NUMERO_DE_CHEQUE', width: 20 },
        { header: 'COMPROBANTE_ANULADO', key: 'COMPROBANTE_ANULADO', width: 20 },
        { header: 'CODIGO_DEL_MOTIVO_DE_DEVOLUCION', key: 'CODIGO_DEL_MOTIVO_DE_DEVOLUCION', width: 20 },
        { header: 'FORMA_DE_PAGO', key: 'FORMA_DE_PAGO', width: 20 },
        { header: 'VALOR_DEL_CARGO_1_DE_LA_SECUENCIA', key: 'VALOR_DEL_CARGO_1_DE_LA_SECUENCIA', width: 20 },
        { header: 'VALOR_DEL_CARGO_2_DE_LA_SECUENCIA', key: 'VALOR_DEL_CARGO_2_DE_LA_SECUENCIA', width: 20 },
        { header: 'VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA', key: 'VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA', width: 20 },
        { header: 'VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA', key: 'VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA', width: 20 },
        { header: 'VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA', key: 'VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA', width: 20 },
        { header: 'FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR', key: 'FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR', width: 20 },
        { header: 'NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR', key: 'NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR', width: 20 },
        { header: 'PREFIJO_DE_ORDER_REFERENCE', key: 'PREFIJO_DE_ORDER_REFERENCE', width: 20 },
        { header: 'CONSECUTIVO_DE_ORDER_REFERENCE', key: 'CONSECUTIVO_DE_ORDER_REFERENCE', width: 20 },
        { header: 'PREFIJO_ORDEN_DE_ENTREGA', key: 'PREFIJO_ORDEN_DE_ENTREGA', width: 20 },
        { header: 'NUMERO_ORDEN_DE_ENTREGA', key: 'NUMERO_ORDEN_DE_ENTREGA', width: 20 },
        { header: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA', key: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA', width: 20 },
        { header: 'MES_FECHA_DE_ORDEN_DE_ENTREGA', key: 'MES_FECHA_DE_ORDEN_DE_ENTREGA', width: 20 },
        { header: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA', key: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA', width: 20 },
        { header: 'INGRESOS_PARA_TERCEROS', key: 'INGRESOS_PARA_TERCEROS', width: 20 },
        { header: 'FECHA_ACTUALIZACION_DEL_DOCUMENTO', key: 'FECHA_ACTUALIZACION_DEL_DOCUMENTO', width: 20 },
        { header: 'HORA_DE_ACTUALIZACION_DEL_DOCUMENTO', key: 'HORA_DE_ACTUALIZACION_DEL_DOCUMENTO', width: 20 },
        { header: 'PREFIJO_ORDEN_DE_ENTREGA2', key: 'PREFIJO_ORDEN_DE_ENTREGA2', width: 20 },
        { header: 'NUMERO_ORDEN_DE_ENTREGA2', key: 'NUMERO_ORDEN_DE_ENTREGA2', width: 20 },
        { header: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA2', key: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA2', width: 20 },
        { header: 'MES_FECHA_DE_ORDEN_DE_ENTREGA2', key: 'MES_FECHA_DE_ORDEN_DE_ENTREGA2', width: 20 },
        { header: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA2', key: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA2', width: 20 },
        { header: 'PREFIJO_ORDEN_DE_ENTREGA3', key: 'PREFIJO_ORDEN_DE_ENTREGA3', width: 20 },
        { header: 'NUMERO_ORDEN_DE_ENTREGA3', key: 'NUMERO_ORDEN_DE_ENTREGA3', width: 20 },
        { header: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA3', key: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA3', width: 20 },
        { header: 'MES_FECHA_DE_ORDEN_DE_ENTREGA3', key: 'MES_FECHA_DE_ORDEN_DE_ENTREGA3', width: 20 },
        { header: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA3', key: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA3', width: 20 },
        { header: 'PREFIJO_ORDEN_DE_ENTREGA4', key: 'PREFIJO_ORDEN_DE_ENTREGA4', width: 20 },
        { header: 'NUMERO_ORDEN_DE_ENTREGA4', key: 'NUMERO_ORDEN_DE_ENTREGA4', width: 20 },
        { header: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA4', key: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA4', width: 20 },
        { header: 'MES_FECHA_DE_ORDEN_DE_ENTREGA4', key: 'MES_FECHA_DE_ORDEN_DE_ENTREGA4', width: 20 },
        { header: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA4', key: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA4', width: 20 },
        { header: 'PREFIJO_ORDEN_DE_ENTREGA5', key: 'PREFIJO_ORDEN_DE_ENTREGA5', width: 20 },
        { header: 'NUMERO_ORDEN_DE_ENTREGA5', key: 'NUMERO_ORDEN_DE_ENTREGA5', width: 20 },
        { header: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA5', key: 'ANIO_FECHA_DE_ORDEN_DE_ENTREGA5', width: 20 },
        { header: 'MES_FECHA_DE_ORDEN_DE_ENTREGA5', key: 'MES_FECHA_DE_ORDEN_DE_ENTREGA5', width: 20 },
        { header: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA5', key: 'DIA_FECHA_DE_ORDEN_DE_ENTREGA5', width: 20 },
        { header: 'PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS', key: 'PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS', width: 20 },
        { header: 'VALOR_ALIMENTOS_ULTRAPROCESADOS', key: 'VALOR_ALIMENTOS_ULTRAPROCESADOS', width: 20 },
        { header: 'VALOR_BEBIDAS_AZUCARADAS', key: 'VALOR_BEBIDAS_AZUCARADAS', width: 20 },
        { header: 'PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA', key: 'PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA', width: 20 },
        { header: 'VALOR_DE_IVA_DE_LA_SECUENCIA', key: 'VALOR_DE_IVA_DE_LA_SECUENCIA', width: 20 },
        { header: 'BASE_DE_RETENCION', key: 'BASE_DE_RETENCION', width: 20 },
        { header: 'BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA', key: 'BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA', width: 20 },
        { header: 'SECUENCIA_GRAVADA_O_EXCENTA', key: 'SECUENCIA_GRAVADA_O_EXCENTA', width: 20 },
        { header: 'PORCENTAJE_AIU', key: 'PORCENTAJE_AIU', width: 20 },
        { header: 'BASE_IVA_AIU', key: 'BASE_IVA_AIU', width: 20 },
        { header: 'VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA', key: 'VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA', width: 20 },
        { header: 'LINEA_PRODUCTO', key: 'LINEA_PRODUCTO', width: 20 },
        { header: 'GRUPO_PRODUCTO', key: 'GRUPO_PRODUCTO', width: 20 },
        { header: 'CODIGO_PRODUCTO', key: 'CODIGO_PRODUCTO', width: 20 },
        { header: 'CANTIDAD', key: 'CANTIDAD', width: 20 },
        { header: 'CANTIDAD_DOS', key: 'CANTIDAD_DOS', width: 20 },
        { header: 'CODIGO_DE_LA_BODEGA', key: 'CODIGO_DE_LA_BODEGA', width: 20 },
        { header: 'CODIGO_DE_LA_UBICACION', key: 'CODIGO_DE_LA_UBICACION', width: 20 },
        { header: 'CANTIDAD_DE_FACTOR_DE_CONVERSION', key: 'CANTIDAD_DE_FACTOR_DE_CONVERSION', width: 20 },
        { header: 'OPERADOR_DE_FACTOR_DE_CONVERSION', key: 'OPERADOR_DE_FACTOR_DE_CONVERSION', width: 20 },
        { header: 'VALOR_DEL_FACTOR_DE_CONVERSION', key: 'VALOR_DEL_FACTOR_DE_CONVERSION', width: 20 },
        { header: 'CLASIFICACION_1', key: 'CLASIFICACION_1', width: 20 },
        { header: 'CLASIFICACION_2', key: 'CLASIFICACION_2', width: 20 },
        { header: 'GRUPO_ACTIVOS', key: 'GRUPO_ACTIVOS', width: 20 },
        { header: 'CODIGO_ACTIVO', key: 'CODIGO_ACTIVO', width: 20 },
        { header: 'ADICION_O_MEJORA', key: 'ADICION_O_MEJORA', width: 20 },
        { header: 'VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA', key: 'VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA', width: 20 },
        { header: 'VECES_A_DEPRECIAR_NIIF', key: 'VECES_A_DEPRECIAR_NIIF', width: 20 },
        { header: 'NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR', key: 'NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR', width: 20 },
        { header: 'PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR', key: 'PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR', width: 20 },
        { header: 'ANIO_DOCUMENTO_DEL_PROVEEDOR', key: 'ANIO_DOCUMENTO_DEL_PROVEEDOR', width: 20 },
        { header: 'MES_DOCUMENTO_DEL_PROVEEDOR', key: 'MES_DOCUMENTO_DEL_PROVEEDOR', width: 20 },
        { header: 'DIA_DOCUMENTO_DEL_PROVEEDOR', key: 'DIA_DOCUMENTO_DEL_PROVEEDOR', width: 20 },
        { header: 'TIPO_DOCUMENTO_DE_PEDIDO', key: 'TIPO_DOCUMENTO_DE_PEDIDO', width: 20 },
        { header: 'CODIGO_COMPROBANTE_DE_PEDIDO', key: 'CODIGO_COMPROBANTE_DE_PEDIDO', width: 20 },
        { header: 'NUMERO_DE_COMPROBANTE_PEDIDO', key: 'NUMERO_DE_COMPROBANTE_PEDIDO', width: 20 },
        { header: 'SECUENCIA_DE_PEDIDO', key: 'SECUENCIA_DE_PEDIDO', width: 20 },
        { header: 'TIPO_DE_MONEDA_ELABORACION', key: 'TIPO_DE_MONEDA_ELABORACION', width: 20 },
        { header: 'TIPO_Y_COMPROBANTE_CRUCE', key: 'TIPO_Y_COMPROBANTE_CRUCE', width: 20 },
        { header: 'NUMERO_DE_DOCUMENTO_CRUCE', key: 'NUMERO_DE_DOCUMENTO_CRUCE', width: 20 },
        { header: 'NUMERO_DE_VENCIMIENTO', key: 'NUMERO_DE_VENCIMIENTO', width: 20 },
        { header: 'ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE', key: 'ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE', width: 20 },
        { header: 'MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE', key: 'MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE', width: 20 },
        { header: 'DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE', key: 'DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE', width: 20 },
        { header: 'NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE', key: 'NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE', width: 20 },
        { header: 'DESCRIPCION_DE_COMENTARIOS', key: 'DESCRIPCION_DE_COMENTARIOS', width: 20 },
        { header: 'DESCRIPCION_LARGA', key: 'DESCRIPCION_LARGA', width: 20 },
        { header: 'INCONTERM', key: 'INCONTERM', width: 20 },
        { header: 'DESCRIPCION_EXPORTACION', key: 'DESCRIPCION_EXPORTACION', width: 20 },
        { header: 'MEDIO_DE_TRANSPORTE', key: 'MEDIO_DE_TRANSPORTE', width: 20 },
        { header: 'PAIS_DE_ORIGEN', key: 'PAIS_DE_ORIGEN', width: 20 },
        { header: 'CIUDAD_DE_ORIGEN', key: 'CIUDAD_DE_ORIGEN', width: 20 },
        { header: 'PAIS_DESTINO', key: 'PAIS_DESTINO', width: 20 },
        { header: 'CIUDAD_DESTINO', key: 'CIUDAD_DESTINO', width: 20 },
        { header: 'PESO_NETO', key: 'PESO_NETO', width: 20 },
        { header: 'PESO_BRUTO', key: 'PESO_BRUTO', width: 20 },
        { header: 'UNIDAD_DE_MEDIDA_NETO', key: 'UNIDAD_DE_MEDIDA_NETO', width: 20 },
        { header: 'UNIDAD_DE_MEDIDA_BRUTO', key: 'UNIDAD_DE_MEDIDA_BRUTO', width: 20 },
        { header: 'CONCEPTO_FACTURACION_EN_BLOQUE', key: 'CONCEPTO_FACTURACION_EN_BLOQUE', width: 20 },
        { header: 'DATOS_ESTABLEC_L_LOCAL_O_OFICINA', key: 'DATOS_ESTABLEC_L_LOCAL_O_OFICINA', width: 20 },
        { header: 'NUMERO_ESTABLECIMIENTO', key: 'NUMERO_ESTABLECIMIENTO', width: 20 }
    ];

    //worksheet.mergeCells('A1:DP1');
    worksheet.mergeCells('A2:DP2');
    worksheet.mergeCells('A3:DP3');
    worksheet.mergeCells('A4:DP4');

    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(1).border = {bottom: {style: 'medium'}};
    worksheet.getRow(2).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(2).border = {bottom: {style: 'medium'}};
    worksheet.getRow(3).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(3).border = {bottom: {style: 'medium'}};
    worksheet.getRow(4).border = {bottom: {style: 'medium'}};

    await workbook.xlsx.writeFile('uploads/data.xlsx');

    return 'uploads/data.xlsx';
}

export const testExcel = async (data: string) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(data);
    const worksheet = workbook.worksheets[0];
    const jsonData: Props[] = [];
    worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
        if (rowNumber > 5) {
            let rowData: Props = {};
            row.eachCell((cell: Cell, colNumber: number) => {
                const fieldName = worksheet.getRow(5).getCell(colNumber).value?.toString() ?? `EMPTY_${colNumber}`;
                rowData[fieldName] = [cell.value?.toString() ?? 'VOID'];
            })
            jsonData.push(rowData)
        }
    })
    fs.writeFileSync(`${data.split('.')[0]}.json`, JSON.stringify(jsonData));
}

/*  los parametros de la función 
    path:  la ruta del fichero xlsx de donde se obtiene la información para el JSON
    row_:  es la fila desde donde comienza los datos en el xlsx
    sheet: es la hoja de donde se quiere sacar la información del xlsx, por defecto es la hoja 0 que es la primera
    key:   es la columna que se quiere usar como identificador de los valores en cada fila, por defecto es 0
    
    la salida de esta función genera un fichero JSON
    SIIGO
    Insumos: la key es la descripcion y el valor es un arreglo de 3 elementos (Línea producto, Grupo producto, Código producto respectivamente)
    Telas: la key es la descripción y el valor es un arreglo de 3 elementos (Línea producto, Grupo producto, Código producto respectivamente)
    Terminado: la key es la descripción y el valor es un arreglo de 4 elementos (Línea producto, Grupo producto, Código producto, Ref siigo respectivamente)

    LIDER
    Insumos: la key es la descripción y el valor es un arreglo de 2 elementos (Código, Color respectivamente)
    Telas: la descripción y el valor es un arreglo de 1 elementos (color)
    Terminado: la key es la referencia_antigua y el valor es un arreglo de 1 elementos (color)

    CATALOGO
    Tallas: la key es la descripción y el value es un array de 1 elemento (codigo_siigo)
    Colores: la key es la descripción y el value es un array de 1 elemento (codigo_siigo)
    Bodegas: la key es el nombre y el value es un array de 1 elemento (codigo_siigo)
*/
export const readileToGenerateJsonFile = async (path: string, row_: number, sheet: number = 0, key: number = 0) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[sheet];
    let jsonData: Props = {};

    worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
        if (rowNumber > row_) {
            let rowData: Props = {};
            let temp = [];
            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber !== key) {
                    let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
                    fieldName = fieldName.replace(/  +/g, "");
                    fieldName = fieldName.replace(/[0-9]-[0-9]{1,3} ?/g, "");
                    const value = (cell.value?.toString() ?? 'VOID').replace(/  +/g, "")
                    temp.push(value);
                    rowData[fieldName] = temp;
                }
            });
            jsonData = { ...jsonData,...rowData};
        }
    });
    fs.writeFileSync(`./uploads/${worksheet.name}.json`, JSON.stringify(jsonData));
    fs.unlinkSync(path);
}

export const createTableMatch = async (file_lider: Props, file_siigo: Props, catalogue: Props): Promise<Props> => {
    let data_match: Props = {};
    for (const key_lider in file_lider) {
        for (const key_siigo in file_siigo) {
            if (diceCoefficient(key_lider, key_siigo) > 0.7) {
                data_match = {
                    ...data_match,
                    [key_lider]: file_siigo[key_siigo]
                };
            }
        }
        for (const key_color in catalogue) {
            const color = file_lider[key_lider][1] ?? 'TRANSPARENTE'
            if (diceCoefficient(color, key_color) > 0.7 && data_match[key_lider] !== undefined) {
                //console.log(data_match[key_lider], catalogue[key_color][0]);
                data_match[key_lider].push(catalogue[key_color][0])
            }
        }
    }
    fs.writeFileSync(`./uploads/data-matched.json`, JSON.stringify(data_match));
    return data_match;
}