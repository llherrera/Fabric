import ExcelJS, { Row, Cell } from 'exceljs';
import fs from 'fs';
import { diceCoefficient } from 'dice-coefficient';
import { JSONInterface, JSONInterfaceData, JSONInterfaceExcel, Insumos, Telas, Producto, SiigoFormat, JSONInterfaceFormat } from "../interfaces/index.ts";

import insumo_siigo from '../../uploads/insumos_siigo.json' assert { type: 'json' };
import telas_siigo from '../../uploads/Telas_Siigo.json' assert { type: 'json' };
import terminado_siigo from '../../uploads/Producto Terminado SIIGO.json' assert { type: 'json' };
import colores from '../../uploads/COLORES.json' assert { type: 'json' };
import tallas from '../../uploads/TALLA.json' assert { type: 'json' };
import bodegas from '../../uploads/BODEGAS.json' assert { type: 'json' };
import ProductoInsumos from '../../uploads/ProductosInsumos.json' assert { type: 'json' }; 
import ProductoTelas from '../../uploads/ProductosTelas.json' assert { type: 'json' }; 


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

export const generateExcel1 = async (data: SiigoFormat[]): Promise<string> => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24*60*60*1000));

    const day = today.getDate();
    const monthIndex = today.getMonth();
    const monthAbbreviations = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const monthAbbreviation = monthAbbreviations[monthIndex];
    const year = today.getFullYear();
    const formattedDate = `${monthAbbreviation} ${day}/${year}`;

    const day_tomo = tomorrow.getDate();
    const monthIndex_tomo = tomorrow.getMonth();
    const monthAbbreviation_tomo = monthAbbreviations[monthIndex_tomo];
    const year_tomo = today.getFullYear();
    const formattedDate_tomo = `${monthAbbreviation_tomo} ${day_tomo}/${year_tomo}`;

    worksheet.columns = [
        { header: 'TIPO DE COMPROBANTE (OBLIGATORIO)', key: 'TIPO_DE_COMPROBANTE', width: 20 },
        { header: 'CÓDIGO COMPROBANTE  (OBLIGATORIO)', key: 'CODIGO_COMPROBANTE', width: 20 },
        { header: 'NÚMERO_DE_DOCUMENTO', key: 'NUMERO_DE_DOCUMENTO', width: 20 },
        { header: 'CUENTA CONTABLE   (OBLIGATORIO)', key: 'CUENTA_CONTABLE', width: 20 },
        { header: 'DÉBITO O CRÉDITO (OBLIGATORIO)', key: 'DEBITO_O_CREDITO', width: 20 },
        { header: 'VALOR DE LA SECUENCIA   (OBLIGATORIO)', key: 'VALOR_DE_LA_SECUENCIA', width: 20 },
        { header: 'AÑO DEL DOCUMENTO', key: 'ANNO_DEL_DOCUMENTO', width: 20 },
        { header: 'MES DEL DOCUMENTO', key: 'MES_DEL_DOCUMENTO', width: 20 },
        { header: 'DIA_DEL_DOCUMENTO', key: 'DIA_DEL_DOCUMENTO', width: 20 },
        { header: 'SECUENCIA', key: 'SECUENCIA', width: 20 },
        { header: 'CENTRO DE COSTO', key: 'CENTRO_DE_COSTO', width: 20 },
        { header: 'NIT', key: 'NIT', width: 20 },
        { header: 'VALOR DE LA SECUENCIA   (OBLIGATORIO)', key: 'DESCRIPCION_DE_LA_SECUENCIA', width: 20 },
        { header: 'LÍNEA PRODUCTO', key: 'LINEA_PRODUCTO', width: 20 },
        { header: 'GRUPO PRODUCTO', key: 'GRUPO_PRODUCTO', width: 20 },
        { header: 'CÓDIGO PRODUCTO', key: 'CODIGO_PRODUCTO', width: 20 },
        { header: 'CANTIDAD', key: 'CANTIDAD', width: 20 },
        { header: 'CÓDIGO_DE_LA_BODEGA', key: 'CODIGO_DE_LA_BODEGA', width: 20 },
        { header: 'CLASIFICACIÓN 1', key: 'CLASIFICACION_1', width: 20 },
        { header: 'CLASIFICACIÓN 2', key: 'CLASIFICACION_2', width: 20 },
    ];

    worksheet.duplicateRow(1,4, true);

    worksheet.mergeCells('A1:T1');
    worksheet.mergeCells('A2:T2');
    worksheet.mergeCells('A3:T3');
    worksheet.mergeCells('A4:T4');

    worksheet.getRow(1).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(1).getCell(1).value = ' LIDER & CO SAS';
    worksheet.getRow(1).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};

    worksheet.getRow(2).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(2).getCell(1).value = 'MODELO PARA LA IMPORTACION DE MOVIMIENTO CONTABLE - MODELO GENERAL';
    worksheet.getRow(2).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(2).getCell(1).alignment = {horizontal: 'center' };

    worksheet.getRow(3).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    worksheet.getRow(3).getCell(1).value = `De: ${formattedDate} A: ${formattedDate_tomo}`;
    worksheet.getRow(3).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(3).getCell(1).alignment = {horizontal: 'center' };

    worksheet.getRow(4).getCell(1).value = '';
    worksheet.getRow(4).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(4).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'FFFFFF'}
    };

    worksheet.getRow(5).eachCell((cell: Cell) => {
        cell.border = {bottom: {style: 'medium'}, right: {style: 'medium'}}
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FFFFFF'}
        }
    })

    await workbook.xlsx.writeFile('uploads/data.xlsx');

    return 'uploads/data.xlsx';
}

export const testExcel = async (data: string) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(data);
    const worksheet = workbook.worksheets[0];
    const jsonData: JSONInterface[] = [];
    worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
        if (rowNumber > 5) {
            let rowData: JSONInterface = {};
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
export const readFileToGenerateJsonFile = async (path: string, row_: number, sheet: number = 0, key: number = 0) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[sheet];
    let jsonData: JSONInterface = {};

    const colums = worksheet.getColumn(key+1);
    if (row_ === 1 && sheet % 2 === 1) {
        colums.eachCell((cell) => {
            if (cell.value === null) cell.value = 'BLANCO';
        });
    }

    worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
        if (rowNumber > row_) {
            let rowData: JSONInterface = {};
            let temp: string[] = [];
            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber !== key) {
                    let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
                    fieldName = fieldName.replace(/  +/g, "");
                    //fieldName = fieldName.replace(/[0-9]{1,4} ?(- ?[0-9]{1,4}){1,2} ?/g, "");
                    fieldName = fieldName.replace(/ +$/, "");
                    //const value = (cell.value?.toString() ?? 'BLANCO').replace(/  +/g, "");
                    let value = (cell.value?.toString() ?? '').replace(/ +$/g, "");
                    value = value === '[object Object]' ? `${temp[colNumber-3]}-${temp[colNumber-2]}` : value;
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

export const readInputFile = async (path: string, filename: string, rowStart: number) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[0];
    let jsonData: JSONInterfaceExcel = {};

    worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
        if (rowNumber > rowStart) {
            let rowData: JSONInterfaceData = {};

            let fieldName = worksheet.getRow(rowNumber).getCell(2).value?.toString() ?? `EMPTY_${2}`;
            fieldName = fieldName.replace(/  +/g, "");
            fieldName = fieldName.replace(/ +$/, "");

            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber != 2) {
                    let value = (cell.value?.toString() ?? 'Vacio').replace(/ +$/g, "");
                    let valueName = worksheet.getRow(rowStart).getCell(colNumber).value?.toString() ?? `EMPTY_${2}`;
                    rowData[valueName] = value;
                }
            });
            jsonData[fieldName] = [...jsonData[fieldName]??[], rowData];
        }
    });
    fs.writeFileSync(`./uploads/${filename}.json`, JSON.stringify(jsonData));
    fs.unlinkSync(path);
}

export const createTableMatch = (file_lider: JSONInterface, file_siigo: JSONInterface, catalogue: JSONInterface): JSONInterface => {
    let data_match: JSONInterface = {};
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

export const createTableColorMatch = (file_lider: JSONInterface, catalogue: JSONInterface, name: string): JSONInterface => {
    let data_match: JSONInterface = {};
    for (const key_lider in file_lider) {
        for (const key_color in catalogue) {
            const color = file_lider[key_lider][1] ?? 'BLANCO'
            if (diceCoefficient(color, key_color) > 0.7) {
                let temp = file_lider[key_lider]
                temp.push(catalogue[key_color][0])
                data_match = {
                    ...data_match,
                    [key_lider]: temp
                }
                //data_match[key_lider].push(catalogue[key_color][0])
            }
        }
    }
    fs.writeFileSync(`./uploads/${name}.json`, JSON.stringify(data_match));
    return data_match;
}

export const generateExcelColor = async (data: JSONInterface, name: string): Promise<string> => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    worksheet.columns = [
        { header: 'Código', key: 'codigo', width: 10 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Color', key: 'color', width: 15 },
        { header: 'Código Color', key: 'codigo_color', width: 10 },
    ]

    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '99CCFF' },
    }

    worksheet.getColumn(1).alignment = { horizontal: 'center' };
    worksheet.getColumn(3).alignment = { horizontal: 'center' };
    worksheet.getColumn(4).alignment = { horizontal: 'center' };

    worksheet.getColumn(1).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    worksheet.getColumn(2).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    worksheet.getColumn(3).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    worksheet.getColumn(4).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};

    for (const key in data) {
        worksheet.addRow({
            codigo: data[key][0],
            descripcion: key,
            color: data[key][1],
            codigo_color: data[key][2],
        })
    }

    await workbook.xlsx.writeFile(`uploads/${name}.xlsx`);
    return `uploads/${name}.xlsx`;
}

const doExcelStyle = (sheet: ExcelJS.Worksheet) => {
    sheet.columns = [
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Línea producto', key: 'linea_producto', width: 15 },
        { header: 'Grupo producto', key: 'grupo_producto', width: 15 },
        { header: 'Código producto', key: 'codigo_producto', width: 15 },
        { header: 'Color', key: 'color', width: 15 },
        { header: 'Código color', key: 'codigo_color', width: 15 },
    ];
    sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '99CCFF' },
    };
    sheet.getColumn(2).alignment = { horizontal: 'center' };
    sheet.getColumn(3).alignment = { horizontal: 'center' };
    sheet.getColumn(4).alignment = { horizontal: 'center' };
    sheet.getColumn(5).alignment = { horizontal: 'center' };
    sheet.getColumn(6).alignment = { horizontal: 'center' };
    sheet.getColumn(1).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    sheet.getColumn(2).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    sheet.getColumn(3).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    sheet.getColumn(4).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    sheet.getColumn(5).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    sheet.getColumn(6).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
    return sheet;
}

interface JSONEquivalencia {
    [key: string]: JSONInterface;
}

export const doMatchColorInFile = async (path: string, filename: string) => {
    const workbook = new ExcelJS.Workbook();
    const newWorkbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    let data: JSONEquivalencia = {};
    for (let i = 1; i < 6; i = i + 2) {
        const worksheet = workbook.worksheets[i];
        const sheetName = i === 1 ? 'Códigos Insumos' : i === 3 ? 'Códigos Telas' : 'Códigos Terminados';
        const key = i === 1 ? 2 : i === 3 ? 1 : 1; // aquí se escoje cual es la columna que será el key del objeto
        let newSheet = newWorkbook.addWorksheet(sheetName);
        newSheet = doExcelStyle(newSheet);

        const colums = worksheet.getColumn(key+1);
        colums.eachCell((cell) => {
            if (cell.value === null) cell.value = 'BLANCO';
        });

        let temp: JSONInterface = {};
        worksheet.eachRow({includeEmpty: true}, (row: Row, rowNumber: number) => {
            let temp2: string[] = [];
            if (rowNumber > 1) {
                let newRow: any = [];
                row.eachCell((cell: Cell, colNumber: number) => {
                    let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
                    const file = colNumber === key ? (i === 1 ? insumo_siigo : i === 3 ? telas_siigo : terminado_siigo) : colores;
                    const aaaa = colNumber === key ? (i === 1 ? 'uploads/insumos_siigo.json' : 
                                                        i === 3 ? 'uploads/Telas_Siigo.json' : 
                                                        'uploads/Producto Terminado SIIGO.json') : 'uploads/COLORES.json';
                    const eeee = JSON.parse(fs.readFileSync(aaaa, 'utf-8'));
                    if (i === 1) {
                        if (colNumber > 1) {
                            //let values = getSiigoCode(cell.value?.toString() ?? 'BLANCO', file, false);
                            let values = getSiigoCode(cell.value?.toString() ?? 'BLANCO', eeee, false);
                            values = values?? ['','',''];
                            newRow.push(cell.value, ...values);
                            aaaa !== 'uploads/COLORES.json' ? temp[fieldName] = values : null;
                        }
                    } else {
                        let values = getSiigoCode(cell.value?.toString() ?? 'BLANCO', eeee, i === 5);
                        values = values?? ['','',''];
                        newRow.push(cell.value, ...values);
                        aaaa !== 'uploads/COLORES.json' ? temp[fieldName] = values : null;
                    }
                });
                newSheet.addRow(newRow);
            }
        });
        data[sheetName] = temp;
    }
    fs.writeFileSync(`./uploads/equivalencias.json`, JSON.stringify(data));
    const name = `uploads/${filename}.xlsx`;
    await newWorkbook.xlsx.writeFile(name);
    return name;
}

export const getCategoryCode = (value: string, path: string) => {
    const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    let values = getSiigoCode(value, productos, false);
    values = values ?? ['','','']
    return values;
}

const getSiigoCode = (key_lider: string, file_siigo: JSONInterface, isCode: boolean) => {
    let key_field = key_lider.replace(/  +/g, "");
    key_field = isCode ? key_lider : key_field.replace(/[0-9]{1,4} ?(- ?[0-9]{1,4}){1,2} ?/g, "");
    key_field = key_field.replace(/ +$/, "");
    for (const key in file_siigo) {
        let key_ = isCode ? file_siigo[key][3] : key;
        let assertion = isCode ? 0.999 : 0.7;
        if (diceCoefficient(key_, key_field) > assertion) {
            return file_siigo[key].slice(0,3);
        }
    }
}

export const generateDataToFormat = async (): Promise<JSONInterfaceFormat> => {
    let data: JSONInterfaceFormat = {};
    let coleccion = new Map<string, SiigoFormat[]>();

    const insumosData: JSONInterfaceExcel = JSON.parse(fs.readFileSync('uploads/ProductosInsumos.json', 'utf-8'));
    const telasData: JSONInterfaceExcel = JSON.parse(fs.readFileSync('uploads/ProductosTelas.json', 'utf-8'));
    for (const key in insumosData) {
        const items = insumosData[key];
        for (let i = 0; i < items.length; i++) {
            const desct = items[i]['Descripcion'];
            const color = items[i]['COLOR'];
            const refer = items[i]['REF LIDER'];
            const taler = items[i]['Taller'];
            const canti = parseFloat(insumosData[key][i]['Cantidad']);
            let register = new SiigoFormat(
                1405053300,
                'C,',
                desct,
                canti,
                12,
                "100"
            );
            //register.setColor(getCodesByName(color,''));// corregir la funcion o acomodar el input para que lea solo el archivo de COLORES
            //register.setCodigoBodega(taler); // hacer el acople o acomode para que lea el archivo de talleres
            if (coleccion.has(key)) {
                coleccion.get(key)?.push(register);
            } else {
                coleccion.set(key, [register]);
            }
        }
    }
    for (const key in telasData) {
        const items = telasData[key];
        for (let i = 0; i < items.length; i++) {
            const desct = items[i]['Nombre de la Tela'];
            const color = items[i]['Color'];
            const refer = items[i]['Referencia Producto terminado'];
            const canti = parseFloat(insumosData[key][i]['Cantidad']);
            let register = new SiigoFormat(
                1405053100,
                'C,',
                desct,
                canti,
                1,
                "100"
            );
            //register.setColor(getCodesByName(color,''));// corregir la funcion o acomodar el input para que lea solo el archivo de COLORES
            //register.setCodigoBodega(taler); // hacer el acople o acomode para que lea el archivo de talleres
            if (coleccion.has(key)) {
                coleccion.get(key)?.push(register);
            } else {
                coleccion.set(key, [register]);
            }
        }
    }

    return data;
}

export const getCodesByName = (description: string, type: string) => {
    let linea_producto: number, grupo_producto: number, codigo_producto: number;

    const aaaa = type === 'insumo' ? 'uploads/insumos_siigo.json' : type === 'tela' ? 'uploads/Telas_Siigo.json' : 'uploads/Producto Terminado SIIGO.json';
    const eeee = JSON.parse(fs.readFileSync(aaaa, 'utf-8'));
    let values = getSiigoCode(description, eeee, false);
    linea_producto = values !== undefined ? parseInt(values[0]) : 0;
    grupo_producto = values !== undefined ? parseInt(values[1]) : 0;
    codigo_producto = values !== undefined ? parseInt(values[2]) : 0;

    return {linea_producto, grupo_producto, codigo_producto, credito: 'C'};
}
