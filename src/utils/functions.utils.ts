import ExcelJS, { Row, Cell } from 'exceljs';
import fs from 'fs';
import { FILES_NAME, regParentesis } from "../utils/constants";
import { JSONInterface, JSONInterfaceData, JSONInterfaceExcel, JSONEquivalencia, ResponseCodesByName, SiigoFormat, JSONInterfaceFormat } from "../interfaces/index";

const dc = require('dice-coefficient');

/*  los parametros de la función 
    path:  la ruta del fichero xlsx de donde se obtiene la información para el JSON
    row_:  es la fila desde donde comienza los datos en el xlsx
    sheet: es la hoja de donde se quiere sacar la información del xlsx, por defecto es la hoja 0 que es la primera
    key:   es la columna que se quiere usar como identificador de los valores en cada fila, por defecto es 1
    
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
export const readFileToGenerateJsonFile = async (path: string, row_: number, sheet: number = 0, key: number = 1, filename: string = 'filename', delete_file: boolean = true) => {
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

    worksheet.eachRow((row: Row, rowNumber: number) => {
        if (rowNumber > row_) {
            let rowData: JSONInterface = {};
            let temp: string[] = [];
            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber !== key) {
                    let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
                    fieldName = fieldName.replace(/ +$/, "");
                    let value = (cell.value?.toString() ?? '').replace(/ +$/g, "");
                    value = value === '[object Object]' ? `${temp[colNumber-3]}-${temp[colNumber-2]}` : value;
                    temp.push(value);
                    rowData[fieldName] = temp;
                }
            });
            jsonData = { ...jsonData,...rowData};
        }
    });
    fs.writeFileSync(`./uploads/${filename}.json`, JSON.stringify(jsonData));
    delete_file ? fs.unlinkSync(path) : null;
}

/*
    path:     la ruta del fichero xlsx de donde se obtiene la información para el JSON
    filename: nombre que recibe el fichero
    rowStart: define la fila donde están los encabezados o titulos de las columnas, idealmente es 1 pero hay casos donde varia
    key:      es la columna donde se ubican las ordenes de producción, por defecto es 1
    
    la salida de esta función genera un fichero JSON donde se agrupan las ordenes de producción,
    la fila donde están los encabezados de las columnas será el key y el valor el valor de la celda
*/
export const readInputFile = async (path: string, filename: string, rowStart: number = 1, key: number = 1) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[0];
    let jsonData: JSONInterfaceExcel = {};

    worksheet.eachRow((row: Row, rowNumber: number) => {
        if (rowNumber > rowStart) {
            let rowData: JSONInterfaceData = {};

            let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
            fieldName = fieldName.replace(/  +/g, "");
            fieldName = fieldName.replace(/ +$/, "");

            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber != key) {
                    let value = (cell.value?.toString() ?? 'Vacio').replace(/ +$/g, "");
                    let valueName = worksheet.getRow(rowStart).getCell(colNumber).value?.toString() ?? `EMPTY_${key}`;
                    rowData[valueName] = value;
                }
            });
            jsonData[fieldName] = [...jsonData[fieldName]??[], rowData];
        }
    });
    fs.writeFileSync(`uploads/${filename}.json`, JSON.stringify(jsonData));
    fs.unlinkSync(path);
}

export const addEquivalent = (lider_path: string, siigo_path: string, name: string, code: boolean) => {
    const lider = JSON.parse(fs.readFileSync(lider_path, 'utf-8'));
    const siigo = JSON.parse(fs.readFileSync(siigo_path, 'utf-8'));
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
    } catch (error) {
        data = {};
    }
    let temp: JSONInterface = {};

    for (const key_lider in lider)
        temp[key_lider] = getSiigoCode(key_lider, siigo, code);

    data[name] = temp;
    fs.writeFileSync(`uploads/equivalencias.json`, JSON.stringify(data));
}

export const addCatalogue = (cat_path: string, name: string) => {
    const cat = JSON.parse(fs.readFileSync(cat_path, 'utf-8'));
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
    } catch (error) {
        data = {};
    }
    data[name] = cat;
    fs.writeFileSync(`uploads/equivalencias.json`, JSON.stringify(data));
}

export const doTable = async (path: string, filename: string) => {
    await readFileToGenerateJsonFile(path, 1, 0, 4, FILES_NAME.SiigoInsum, false);
    await readFileToGenerateJsonFile(path, 1, 1, 2, FILES_NAME.LiderInsum, false);
    await readFileToGenerateJsonFile(path, 1, 2, 4, FILES_NAME.SiigoTelas, false);
    await readFileToGenerateJsonFile(path, 1, 3, 1, FILES_NAME.LiderTelas, false);
    await readFileToGenerateJsonFile(path, 1, 4, 5, FILES_NAME.SiigoProds, false);
    await readFileToGenerateJsonFile(path, 1, 5, 1, FILES_NAME.LiderProds);
    addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
    addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
    addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
    const name = await generateEquivalentTable(filename);
    return name;
}

export const doCatalogueTable = async (path: string, filename: string) => {
    await readFileToGenerateJsonFile(path, 7, 0, 2, FILES_NAME.Tallas, false);
    await readFileToGenerateJsonFile(path, 7, 1, 2, FILES_NAME.Colores, false);
    await readFileToGenerateJsonFile(path, 7, 2, 2, FILES_NAME.Bodegas);
    addCatalogue(`uploads/${FILES_NAME.Tallas}.json`, FILES_NAME.CodesNameTalla);
    addCatalogue(`uploads/${FILES_NAME.Colores}.json`, FILES_NAME.CodesNamecolor);
    addCatalogue(`uploads/${FILES_NAME.Bodegas}.json`, FILES_NAME.CodesNameBodeg);
    const name = await generateEquivalentTable(filename);
    return name;
}

export const generateEquivalentTable = async (filename: string) => {
    const workbook = new ExcelJS.Workbook();
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
    } catch (error) {
        data = {};
    }
    for (const section in data) {
        const seccion = data[section];
        let sheet = workbook.addWorksheet(section);
        let i = 0;
        for (const key in seccion) {
            const temp = seccion[key];
            if (i === 0) {
                temp.length === 3 ?
                    sheet.columns = [
                        {header: 'Referencia', width: 50},
                        {header: 'Línea producto', width: 20},
                        {header: 'Grupo producto', width: 20},
                        {header: 'Código producto', width: 20}
                    ]
                    : sheet.columns = [
                        {header: 'Descripción', width: 50},
                        {header: 'Código Siigo', width: 20}
                    ];
            }
            sheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '99CCFF' },
            };
            temp.length === 3 ?
                sheet.addRow([key, ...temp]) 
                : sheet.addRow([key, temp[0]]);
            i = i + 1;
        }
    }
    const name = `uploads/${filename}.xlsx`;
    await workbook.xlsx.writeFile(name);
    return name;
}

export const getCategoryCode = (value: string, path: string) => {
    const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    let values = getSiigoCode(value, productos, false);
    return values[0];
}

const getSiigoCode = (key_lider: string, file_siigo: JSONInterface, isCode: boolean) => {
    let key_field = key_lider.replace(/  +/g, "");
    key_field = isCode ? key_lider : key_field.replace(/[0-9]{1,4} ?(- ?[0-9]{1,4}){1,2} ?/g, "");
    key_field = key_field.replace(/ +$/, "");
    key_field = key_field.replace(/%[a-zA-Z]/g, (match) => match.replace('%', '% '));
    key_field = key_field.replace(/[a-zA-Z]\(/g, (match) => match.replace('(', '( '));
    key_field = key_field.replaceAll('ALGO ', 'ALGODON ');
    key_field = key_field.replaceAll('ALG ', 'ALGODON ');
    key_field = key_field.replaceAll('POLI ', 'POLIESTER ');
    key_field = key_field.replaceAll('POL ', 'POLIESTER ');

    let maxAssertion = 0, maxAssertionT = 0, maxKey = '';
    for (const key in file_siigo) {
        let key_ = isCode ? file_siigo[key][3] : key;
        key_ = key_.replace(/%[a-zA-Z]/g, (match) => match.replace('%', '% '));
        key_ = key_.replace(/[a-zA-Z]\(/g, (match) => match.replace('(', '( '));
        key_ = key_.replaceAll('ALGO ', 'ALGODON ');
        key_ = key_.replaceAll('ALG ', 'ALGODON ');
        key_ = key_.replaceAll('POLI ', 'POLIESTER ');
        key_ = key_.replaceAll('POL ', 'POLIESTER ');
        key_ = key_.replaceAll('TALLA ', '');
        key_ = key_.trim();

        let assertion = isCode ? 0.999 : 0.7;
        const matchSiigo = key_.match(regParentesis);
        const matchLider = key_field.match(regParentesis);
        let valueCoef = dc(key_, key_field);
        if (valueCoef > 0.9) {
            if (valueCoef > maxAssertion) {
                maxKey = key;
                maxAssertion = valueCoef;
            }
        } else if (matchLider && matchSiigo) {
            let nombreS     = matchSiigo[1].trim();
            let comercialS  = matchSiigo[2].trim();
            let nombreL     = matchLider[1].trim();
            let comercialL  = matchLider[2].trim();

            let valueNombre   = dc(nombreS, nombreL);
            let valueComercial = dc(comercialS, comercialL);
            if (valueNombre > assertion && valueComercial > assertion) {
                if (valueNombre > maxAssertion && (valueComercial >= maxAssertionT || valueComercial > assertion)) {
                    maxKey = key;
                    maxAssertion = valueNombre;
                    maxAssertionT = valueComercial;
                } 
            }
        } else if (matchLider === null && matchSiigo === null) {
            if (valueCoef > assertion) {
                if (valueCoef > maxAssertion) {
                    maxKey = key;
                    maxAssertion = valueCoef;
                }
            }
        }
    }
    if(maxKey !== '') return file_siigo[maxKey].slice(0,3);
    else return ['0','0','0'];
}

const doDataToFormat = () => {
    const insumosData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosInsumos}.json`, 'utf-8'));
    const telasData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosTelas}.json`, 'utf-8'));
    let coleccion = new Map<string, SiigoFormat[]>();
    for (const key in insumosData) {
        const items = insumosData[key];
        for (let i = 0; i < items.length; i++) {
            const desct = items[i]['Descripcion'];
            const color = items[i]['COLOR'];
            const refer = items[i]['REF LIDER'];
            const taler = items[i]['Taller'];
            const canti = parseFloat(items[i]['Cantidad Insumos Retirados']);
            let register = new SiigoFormat(
                1405053300,
                'C',
                desct,
                canti,
                12,
                "1"
            );
            register.setCodigosSiigo(desct, FILES_NAME.CodesNameInsum);
            register.setColor(color);
            if (coleccion.has(key)) {
                const secuencia = coleccion.get(key)?.length;
                register.setSecuencia(secuencia! + 1);
                coleccion.get(key)?.push(register);
            } else {
                register.setSecuencia(1);
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
            const canti = parseFloat(items[i]['Cantidad']);
            let register = new SiigoFormat(
                1405053100,
                'C',
                desct,
                canti,
                1,
                "1"
            );
            register.setCodigosSiigo(desct, FILES_NAME.CodesNameTelas);
            register.setColor(color);
            if (coleccion.has(key)) {
                const secuencia = coleccion.get(key)?.length;
                register.setSecuencia(secuencia! + 1);
                coleccion.get(key)?.push(register);
            } else {
                register.setSecuencia(1);
                coleccion.set(key, [register]);
            }
        }
    }
    const JSONDATA = JSON.stringify(Object.fromEntries(coleccion));
    fs.writeFileSync(`uploads/dataFormat.json`, JSONDATA);
    return `uploads/dataFormat.json`;
}

const doDebit = () => {
    const data: JSONInterfaceFormat = JSON.parse(fs.readFileSync('uploads/dataFormat.json', 'utf-8'));
    const tallas: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosTallas}.json`, 'utf-8'));
    const refColor: JSONInterfaceData = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.LiderProds}.json`, 'utf-8'));
    for (const op in data) {
        const tallasOp = tallas[op];
        const secuencia = data[op].length + 1;        
        if (tallasOp) {
            for (let i = 0; i < tallasOp.length; i++) {
                const item = tallasOp[i];
                let cantidad = parseFloat(item['cant_asignada']);
                let register = new SiigoFormat(
                    1410053100,
                    'D',
                    `OP${op}`,
                    cantidad,
                    0,
                    '100'
                );
                const ref = item['referencia_antigua'];
                register.setSecuencia(secuencia);
                register.setCodigosSiigo(ref, 'Códigos Terminados');
                register.setCodigoBodega(item['c_razon_social']);
                register.setTalla(item['c_id_talla']);
                try {
                    register.setColor(refColor[ref][0]);
                } catch (error) {
                    register.setColor('BLANCO');
                }
                data[op].push(register);
            }
        } else {
            let cantidad = 0;
            let talla = 35;
            const ref: string = getPropertyFormatByOP(op, 'ref');
            const taller: string = getPropertyFormatByOP(op, 'taller');
            let register = new SiigoFormat(
                1410053100,
                'D',
                `OP${op}`,
                cantidad,
                0,
                '100'
            );
            register.setSecuencia(secuencia);
            register.setCodigosSiigo(ref, 'Códigos Terminados');
            register.setCodigoBodega(taller);
            register.setTalla(talla.toString());
            data[op].push(register);
        }
    }
    const JSONDATA = JSON.stringify(data);
    fs.writeFileSync(`uploads/dataFormat.json`, JSONDATA);
    return `uploads/dataFormat.json`;
}

const doExcelStyleSiigo = (worksheet: ExcelJS.Worksheet) => {
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

    const columns = [
        'TIPO DE COMPROBANTE (OBLIGATORIO)',
        'CÓDIGO COMPROBANTE  (OBLIGATORIO)',
        'NÚMERO_DE_DOCUMENTO',
        'CUENTA CONTABLE   (OBLIGATORIO)',
        'DÉBITO O CRÉDITO (OBLIGATORIO)',
        'VALOR DE LA SECUENCIA   (OBLIGATORIO)',
        'AÑO DEL DOCUMENTO',
        'MES DEL DOCUMENTO',
        'DIA_DEL_DOCUMENTO',
        'SECUENCIA',
        'CENTRO DE COSTO',
        'NIT',
        'DESCRIPCIÓN DE LA SECUENCIA',
        'LÍNEA PRODUCTO',
        'GRUPO PRODUCTO',
        'CÓDIGO PRODUCTO',
        'CANTIDAD',
        'CÓDIGO_DE_LA_BODEGA',
        'CLASIFICACIÓN 1',
        'CLASIFICACIÓN 2',
    ];

    worksheet.addRow({});

    worksheet.duplicateRow(1, 3, true);

    worksheet.mergeCells('A1:T1');
    worksheet.mergeCells('A2:T2');
    worksheet.mergeCells('A3:T3');
    worksheet.mergeCells('A4:T4');

    worksheet.getRow(1).getCell(1).value = ' LIDER & CO SAS';
    worksheet.getRow(1).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(1).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'},
    };

    worksheet.getRow(2).getCell(1).value = 'MODELO PARA LA IMPORTACION DE MOVIMIENTO CONTABLE - MODELO GENERAL';
    worksheet.getRow(2).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(2).getCell(1).alignment = {horizontal: 'center' };
    worksheet.getRow(2).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };
    
    worksheet.getRow(3).getCell(1).value = `De: ${formattedDate} A: ${formattedDate_tomo}`;
    worksheet.getRow(3).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(3).getCell(1).alignment = {horizontal: 'center' };
    worksheet.getRow(3).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '99CCFF'}
    };

    worksheet.getRow(4).getCell(1).value = '';
    worksheet.getRow(4).getCell(1).border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
    worksheet.getRow(4).getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'FFFFFF'}
    };

    worksheet.insertRow(5, columns, 'i');
    worksheet.getRow(5).eachCell((cell: Cell, colNumber: number) => {
        cell.border = {bottom: {style: 'medium'}, right: {style: 'medium'}};
        cell.value = columns[colNumber-1];
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: '99CCFF'}
        };
    })
    return worksheet;
}

const getPropertyFormatByOP = (op: string, property: string) => {
    const insumosData: JSONInterfaceExcel = JSON.parse(fs.readFileSync('uploads/ProductosInsumos.json', 'utf-8'));
    const telasData: JSONInterfaceExcel = JSON.parse(fs.readFileSync('uploads/ProductosTelas.json', 'utf-8'));
    if (property === 'ref') {
        let item;
        if (insumosData[op]) {
            item = insumosData[op].find(item => item.hasOwnProperty('REF LIDER'));
            if (item) return item['REF LIDER'];
        }
        if (telasData[op]) {
            item = telasData[op].find(item => item.hasOwnProperty('Referencia Producto terminado'));
            if (item) return item['Referencia Producto terminado'];
        }
        return '0-0';
    }
    if (property === 'taller') {
        let item;
        if (insumosData[op]) {
            item = insumosData[op].find(item => item.hasOwnProperty('REF LIDER'));
            if (item) return item['REF LIDER'];
        }
        return '0';
    }
    return '';
}

export const generateDataToFormat = async (filename: string, orders: string[], docNumber: number) => {
    const workbook = new ExcelJS.Workbook();
    let pathData = doDataToFormat();
    pathData = doDebit();
    const data: JSONInterfaceFormat = JSON.parse(fs.readFileSync(pathData, 'utf-8'));

    let worksheet = workbook.addWorksheet(`O1-i`);
    worksheet = doExcelStyleSiigo(worksheet);
    let i = docNumber;
    for (const key in data) {
        if (orders.length === 0 || orders.includes(key)) {
            let orden_i = data[key];
            for (let j = 0; j < orden_i.length; j++) {
                const row = worksheet.addRow([
                    orden_i[j].TIPO_DE_COMPROBANTE,
                    orden_i[j].CODIGO_COMPROBANTE,
                    i,
                    orden_i[j].CUENTA_CONTABLE,
                    orden_i[j].DEBITO_O_CREDITO,
                    orden_i[j].VALOR_DE_LA_SECUENCIA,
                    orden_i[j].ANNO_DEL_DOCUMENTO,
                    orden_i[j].MES_DEL_DOCUMENTO,
                    orden_i[j].DIA_DEL_DOCUMENTO,
                    orden_i[j].SECUENCIA,
                    orden_i[j].CENTRO_DE_COSTO,
                    orden_i[j].NIT,
                    orden_i[j].DESCRIPCION_DE_LA_SECUENCIA,
                    orden_i[j].LINEA_PRODUCTO,
                    orden_i[j].GRUPO_PRODUCTO,
                    orden_i[j].CODIGO_PRODUCTO,
                    orden_i[j].CANTIDAD,
                    orden_i[j].CODIGO_DE_LA_BODEGA,
                    orden_i[j].CLASIFICACION_1,
                    orden_i[j].CLASIFICACION_2,
                ]);
                row.eachCell({includeEmpty: true}, (cell: Cell) => {
                    cell.border = {bottom: {style: 'thin'}, right: {style: 'thin'}};
                });
            }
            i = i + 1;
        }
    }
    const name = `uploads/${filename}.xlsx`
    await workbook.xlsx.writeFile(name);
    return name;
}

export const getCodesByName = (description: string, type: string): ResponseCodesByName => {
    let linea_producto: string, grupo_producto: string, codigo_producto: string;

    const tablaEqui: JSONEquivalencia = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
    
    try {
        let values = tablaEqui[type][description];
        linea_producto = (values !== undefined || values[0] !== '') ? values[0] : '0';
        grupo_producto = (values !== undefined || values[1] !== '') ? values[1] : '0';
        codigo_producto = (values !== undefined || values[2] !== '') ? values[2] : '0';
    } catch (error) {
        const siigo_path = (type === FILES_NAME.CodesNameInsum ? `uploads/${FILES_NAME.SiigoInsum}.json` : type === FILES_NAME.CodesNameTelas ? `uploads/${FILES_NAME.SiigoTelas}.json` : type === FILES_NAME.CodesNameProds ? `uploads/${FILES_NAME.SiigoProds}.json` : 'Error');
        const siigo = JSON.parse(fs.readFileSync(siigo_path, 'utf-8'));
        let values = getSiigoCode(description, siigo, type === FILES_NAME.CodesNameProds);
        linea_producto = (values !== undefined || values[0] !== '') ? values[0] : '0';
        grupo_producto = (values !== undefined || values[1] !== '') ? values[1] : '0';
        codigo_producto = (values !== undefined || values[2] !== '') ? values[2] : '0';
    }
    return {linea_producto, grupo_producto, codigo_producto};
}
