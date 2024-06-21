import ExcelJS, { Row, Cell } from 'exceljs';
import fs from 'fs';
import 'dotenv/config';
import { JSONInterface, JSONInterfaceData, JSONInterfaceExcel, JSONEquivalencia, ResponseCodesByName, SiigoFormat, JSONInterfaceFormat } from "../interfaces/index";
import { FILES_NAME, regParentesis, regReferencia } from "../utils/constants";
import { logger } from '../utils/logger.utils';
import { NError } from '../utils/errors.utils';
               
const dc = require('dice-coefficient');

const CInsumos    = parseInt(process.env.CUENTA_INSUMOS    || '0000000000');
const CTelas      = parseInt(process.env.CUENTA_TELAS      || '0000000000');
const CConfeccion = parseInt(process.env.CUENTA_CONFECCION || '0000000000');
const CBordados   = parseInt(process.env.CUENTA_BORDADOS   || '0000000000');
const CLavanderia = parseInt(process.env.CUENTA_LAVANDERIA || '0000000000');
const CEstampado  = parseInt(process.env.CUENTA_ESTAMPADO  || '0000000000');
const CProceso    = parseInt(process.env.CUENTA_PROCESO    || '0000000000');
const CTerminado  = parseInt(process.env.CUENTA_TERMINADO  || '0000000000');

/*  los parametros de la función 
    path:        la ruta del fichero xlsx de donde se obtiene la información para el JSON
    row_:        es la fila desde donde comienza los datos en el xlsx
    sheet:       es la hoja de donde se quiere sacar la información del xlsx, por defecto es la hoja 0 que es la primera
    key:         es la columna que se quiere usar como identificador de los valores en cada fila, por defecto es 1
    filename:    es el nombre que se le otorga al fichero JSON
    delete_file: determina si se borra el fichero xlsx despues de crear el JSON (para ahorrar espacio), por defecto es true

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
    Tallas:   la key es la descripción y el value es un array de 1 elemento (codigo_siigo)
    Colores:  la key es la descripción y el value es un array de 1 elemento (codigo_siigo)
    Bodegas:  la key es el nombre y el value es un array de 1 elemento (Bodega)
    Procesos: la key es el nombre y el value es un array de 1 elemento (Bodega)
    Clientes: la key es el nombre y el value es un array de 1 elemento (Bodega)
*/
export const readFileToGenerateJsonFile = async (path: string, row_: number, sheet: number = 0, key: number = 1, filename: string = 'filename', delete_file: boolean = true) => {
    const workbook = new ExcelJS.Workbook();
    logger.info(`Reading xlsx file in path: ${path} for Equivalent table`);
    await workbook.xlsx.readFile(path);
    logger.info(`Reading xlsx sheet: ${sheet}`);
    const worksheet = workbook.worksheets[sheet];
    let jsonData: JSONInterface = {};

    logger.info(`Fill the empty columns with 'BLANCO'`);
    const colums = worksheet.getColumn(key+1);
    if (filename === FILES_NAME.LiderInsum || filename === FILES_NAME.LiderTelas || filename === FILES_NAME.LiderProds) {
        colums.eachCell((cell) => {
            if (cell.value === null) cell.value = 'BLANCO';
        });
    }

    logger.info(`Reading cell by cell`);
    worksheet.eachRow((row: Row, rowNumber: number) => {
        if (rowNumber > row_) {
            let rowData: JSONInterface = {};
            let temp: string[] = [];
            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber !== key) {
                    logger.info(`Reading ${rowNumber}:${colNumber}`);
                    let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
                    let fieldNameC = fieldName.match(regReferencia);
                    (fieldNameC && filename === FILES_NAME.SiigoProds) ? fieldName = fieldNameC[0] : fieldName = fieldName;
                    fieldName = fieldName.replace('TALLA', '');
                    fieldName = fieldName.trim();
                    let value = (cell.value?.toString() ?? '').trim();
                    value = value === '[object Object]' ? `${temp[colNumber-3]}-${temp[colNumber-2]}` : value;
                    logger.info(`Fieldname: ${fieldName} value: ${value}`);
                    temp.push(value);
                    fieldName !== 'UNICA' ? rowData[fieldName] = temp : null;
                }
            });
            jsonData = { ...jsonData,...rowData};
        }
    });
    fs.writeFileSync(`./uploads/${filename}.json`, JSON.stringify(jsonData));
    logger.info(`JSON file created`);
    //delete_file ? fs.unlinkSync(path) : null;
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
    logger.info(`Reading xlsx file in path: ${path} for Ordens`);
    await workbook.xlsx.readFile(path);
    logger.info(`Reading xlsx sheet: 0`);
    const worksheet = workbook.worksheets[0];
    let jsonData: JSONInterfaceExcel = {};

    worksheet.eachRow((row: Row, rowNumber: number) => {
        if (rowNumber > rowStart) {
            let rowData: JSONInterfaceData = {};
            let fieldName = worksheet.getRow(rowNumber).getCell(key).value?.toString() ?? `EMPTY_${key}`;
            fieldName = fieldName.replace(/\s\s+/g, "");
            fieldName = fieldName.trim();
            logger.info(`Order production ${fieldName}`);
            row.eachCell((cell: Cell, colNumber: number) => {
                if (colNumber != key) {
                    logger.info(`Reading ${rowNumber}:${colNumber}`);
                    let value = (cell.value?.toString() ?? 'Vacio').replace(/ +$/g, "");
                    let valueName = worksheet.getRow(rowStart).getCell(colNumber).value?.toString() ?? `EMPTY_${key}`;
                    logger.info(`Fieldname: ${valueName} value: ${value}`);
                    rowData[valueName] = value;
                }
            });
            jsonData[fieldName] = [...jsonData[fieldName]??[], rowData];
        }
    });
    fs.writeFileSync(`uploads/${filename}.json`, JSON.stringify(jsonData));
    //fs.unlinkSync(path);
    logger.info(`JSON file created`);
}

export const addEquivalent = (lider_path: string, siigo_path: string, name: string, code: boolean) => {
    const lider = JSON.parse(fs.readFileSync(lider_path, 'utf-8'));
    const siigo = JSON.parse(fs.readFileSync(siigo_path, 'utf-8'));
    logger.info(`Reading Lider and Siigo JSON file`);
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
        logger.info(`Readed equivalent file`);
    } catch (error) {
        data = {};
        logger.info(`Equivalent file do not exits yet`);
    }
    let temp: JSONInterface = {};

    for (const key_lider in lider) {
        logger.info(`Search ${key_lider} codes in Siigo's file`);
        temp[key_lider] = getSiigoCode(key_lider, siigo, code);
    }

    data[name] = temp;
    fs.writeFileSync(`uploads/equivalencias.json`, JSON.stringify(data));
    logger.info(`Equivalent JSON file updated`);
}

export const addCatalogue = (cat_path: string, name: string) => {
    const cat = JSON.parse(fs.readFileSync(cat_path, 'utf-8'));
    logger.info(`Reading Catalogue JSON file`);
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
        logger.info(`Readed equivalent file`);
    } catch (error) {
        data = {};
        logger.info(`Equivalent file do not exits yet`);
    }
    data[name] = cat;
    fs.writeFileSync(`uploads/equivalencias.json`, JSON.stringify(data));
    logger.info(`Equivalent JSON file updated`);
}

export const doTable = async (path: string, filename: string) => {
    await readFileToGenerateJsonFile(path, 1, 0, 4, FILES_NAME.SiigoInsum, false);
    await readFileToGenerateJsonFile(path, 1, 1, 2, FILES_NAME.LiderInsum, false);
    await readFileToGenerateJsonFile(path, 1, 2, 4, FILES_NAME.SiigoTelas, false);
    await readFileToGenerateJsonFile(path, 1, 3, 1, FILES_NAME.LiderTelas, false);
    await readFileToGenerateJsonFile(path, 1, 4, 5, FILES_NAME.SiigoProds, false);
    await readFileToGenerateJsonFile(path, 1, 5, 1, FILES_NAME.LiderProds, false);
    await readFileToGenerateJsonFile(path, 1, 6, 4, FILES_NAME.LiderServi);
    addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
    addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
    addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
    addCatalogue(`uploads/${FILES_NAME.LiderServi}.json`, FILES_NAME.CodesNameServi);
    const name = await generateEquivalentTable(filename);
    return name;
}

export const doCatalogueTable = async (path: string, filename: string) => {
    await readFileToGenerateJsonFile(path, 7, 0, 2, FILES_NAME.Tallas, false);
    await readFileToGenerateJsonFile(path, 7, 1, 2, FILES_NAME.Colores, false);
    await readFileToGenerateJsonFile(path, 7, 2, 2, FILES_NAME.Bodegas, false);
    await readFileToGenerateJsonFile(path, 1, 3, 2, FILES_NAME.Procesos, false);
    await readFileToGenerateJsonFile(path, 1, 4, 2, FILES_NAME.Clientes);
    addCatalogue(`uploads/${FILES_NAME.Tallas}.json`, FILES_NAME.CodesNameTalla);
    addCatalogue(`uploads/${FILES_NAME.Colores}.json`, FILES_NAME.CodesNamecolor);
    addCatalogue(`uploads/${FILES_NAME.Bodegas}.json`, FILES_NAME.CodesNameBodeg);
    addCatalogue(`uploads/${FILES_NAME.Procesos}.json`, FILES_NAME.CodesNameProce);
    addCatalogue(`uploads/${FILES_NAME.Clientes}.json`, FILES_NAME.CodesNameClien);
    const name = await generateEquivalentTable(filename);
    return name;
}

export const generateEquivalentTable = async (filename: string) => {
    const workbook = new ExcelJS.Workbook();
    let data: JSONEquivalencia = {};
    try {
        data = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
        logger.info(`Readed equivalent file`);
    } catch (error) {
        data = {};
        logger.info(`Equivalent file do not exits yet`);
        throw new NError(404, {table: true}, 'Equivalent file not found')
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
    logger.info(`Equivalent XLSX file created`);
    const name = `uploads/${filename}.xlsx`;
    await workbook.xlsx.writeFile(name);
    return name;
}

export const getCategoryCode = (value: string, type: string) => {
    const { linea_producto } = getCodesByName(value, type);
    return linea_producto;
}

export const getServiceCode = (value: string, type: string) => {
    const { linea_producto, grupo_producto, codigo_producto } = getCodesByName(value, type);
    return [linea_producto, grupo_producto, codigo_producto];
}

const getSiigoCode = (key_lider: string, file_siigo: JSONInterface, isCode: boolean) => {
    let key_field = key_lider.replace(/  +/g, " ");
    key_field = isCode ? key_lider : key_field.replace(regReferencia, "");
    key_field = key_field.replace(/%[a-zA-Z]/g, (match) => match.replace('%', '% '));
    key_field = key_field.replace(/[a-zA-Z]\(/g, (match) => match.replace('(', '( '));
    key_field = key_field.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    key_field = key_field.replaceAll(',', '');
    key_field = key_field.replaceAll('.', '');
    key_field = key_field.replaceAll('ALGO ', 'ALGODON ');
    key_field = key_field.replaceAll('ALG ', 'ALGODON ');
    key_field = key_field.replaceAll('POLI ', 'POLIESTER ');
    key_field = key_field.replaceAll('POL ', 'POLIESTER ');
    key_field = key_field.trim();

    let maxAssertion = 0, maxAssertionT = 0, maxKey = '';
    for (const key in file_siigo) {
        let key_ = key;
        key_ = key_.replace(/%[a-zA-Z]/g, (match) => match.replace('%', '% '));
        key_ = key_.replace(/[a-zA-Z]\(/g, (match) => match.replace('(', '( '));
        key_ = key_.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        key_ = key_.replaceAll(',', '');
        key_ = key_.replaceAll('.', '');
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
    if(maxKey !== '') {
        logger.info(`Adding [${key_lider}] ${maxKey}`);
        return file_siigo[maxKey].slice(0,3);
    }
    else return ['0','0','0'];
}

const doDataToFormat1 = () => {
    const insumosData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosInsumos}.json`, 'utf-8'));
    const telasData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosTelas}.json`, 'utf-8'));
    let coleccion = new Map<string, SiigoFormat[]>();
    logger.info(`Reading 'Insumos' and 'Telas' credits JSON file`);
    for (const op in insumosData) {
        const items = insumosData[op];
        for (let i = 0; i < items.length; i++) {
            logger.info(`Making register`);
            const desct = items[i]['Descripcion'];
            logger.info(`Register has 'Descripcion'`);
            const color = items[i]['COLOR'];
            logger.info(`Register has 'COLOR'`);
            const canti = parseFloat(items[i]['Cantidad Insumos Retirados']);
            logger.info(`Register has 'Cantidad Insumos Retirados'`);
            let register = new SiigoFormat(
                1,
                CInsumos,
                'C',
                desct,
                canti,
                12,
                "1"
            );
            register.setCodigosSiigo(desct, FILES_NAME.CodesNameInsum);
            logger.info(`Register has Siigo codes`);
            register.setColor(color, FILES_NAME.CodesNamecolor);
            logger.info(`Register has Color code`);
            if (coleccion.has(op)) {
                const secuencia = coleccion.get(op)?.length;
                register.setSecuencia(secuencia! + 1);
                coleccion.get(op)?.push(register);
                logger.info(`Added register to OP ${op}`);
            } else {
                register.setSecuencia(1);
                coleccion.set(op, [register]);
                logger.info(`Added register to OP ${op}`);
            }
        }
    }
    for (const op in telasData) {
        const items = telasData[op];
        for (let i = 0; i < items.length; i++) {
            logger.info(`Making register`);
            const desct = items[i]['Nombre de la Tela'];
            logger.info(`Register has 'Nombre de la Tela'`);
            const color = items[i]['Color'];
            logger.info(`Register has 'Color'`);
            const refer = items[i]['Referencia Producto terminado'];
            logger.info(`Register has 'Referencia Producto terminado'`);
            const canti = parseFloat(items[i]['Cantidad']);
            logger.info(`Register has 'Cantidad'`);
            let register = new SiigoFormat(
                1,
                CTelas,
                'C',
                desct,
                canti,
                1,
                "1"
            );
            register.setCodigosSiigo(desct, FILES_NAME.CodesNameTelas);
            logger.info(`Register has Siigo codes`);
            register.setColor(color, FILES_NAME.CodesNamecolor);
            logger.info(`Register has Color code`);
            if (coleccion.has(op)) {
                const secuencia = coleccion.get(op)?.length;
                register.setSecuencia(secuencia! + 1);
                coleccion.get(op)?.push(register);
                logger.info(`Added register to OP ${op}`);
            } else {
                register.setSecuencia(1);
                coleccion.set(op, [register]);
                logger.info(`Added register to OP ${op}`);
            }
        }
    }
    const JSONDATA = JSON.stringify(Object.fromEntries(coleccion));
    fs.writeFileSync(`uploads/${FILES_NAME.dataFormat1}.json`, JSONDATA);
    logger.info(`Credit information now has a Siigo format`);
    return `uploads/${FILES_NAME.dataFormat1}.json`;
}

const doDataToFormat2 = () => {
    const processData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosProcesos}.json`, 'utf-8'));
    const producLider: JSONInterface = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.SiigoProds}.json`, 'utf-8'));
    let coleccion = new Map<string, SiigoFormat[]>();
    logger.info(`Reading 'Productos en proceso' JSON file`);
    for (const op in processData) {
        const items = processData[op];
        let cantxprocSum = 0;
        let secuencia = 1;
        for (let i = 0; i < items.length; i++) {
            logger.info(`Making product on process register`);
            const taller    = items[i]['Taller'];
            const color     = items[i]['Color'];
            const ref       = items[i]['Referencia Producto Terminado'];
            const talla     = items[i]['Talla'];            
            const ingreso   = items[i]['Cantidad Ingreso'];
            const ingresInt = parseInt(ingreso);
            cantxprocSum = cantxprocSum + ingresInt;

            let register = new SiigoFormat(
                2,
                CProceso,
                'C',
                `OP ${op}`,
                ingresInt,
                12,
                "1"
            );
            register.setLineaProducto(2);
            register.setGrupoProducto(parseInt(ref.split('-')[0]));
            register.setCodigoProducto(parseInt(ref.split('-')[1]));
            logger.info(`Register has Siigo codes`);
            register.setColor(color.toUpperCase(), FILES_NAME.CodesNamecolor);
            logger.info(`Register has Color code`);
            register.setTalla(talla, FILES_NAME.CodesNameTalla);
            logger.info(`Register has 'Talla'`);
            register.setCodigoBodega(taller, FILES_NAME.CodesNameBodeg);
            logger.info(`Register has 'Bodega'`);
            if (coleccion.has(op)) {
                register.setSecuencia(secuencia);
                coleccion.get(op)?.push(register);
                logger.info(`Added product on process register to OP ${op}`);
            } else {
                register.setSecuencia(secuencia);
                coleccion.set(op, [register]);
                logger.info(`Added product on process register to OP ${op}`);
            }
        }
        secuencia = secuencia + 1;
        const item = items[0];
        const procesos = item['Procesos'];
        const cantxpro = item['Cant_X_proceso'];
        let refItem = item['Referencia Producto Terminado'];
        refItem = refItem !== undefined ? refItem.replaceAll('-', ' - ') : refItem;
        let procesosSp = procesos.split(',');
        let cantxproSp = cantxpro.split(/[,.]/);
        if (procesosSp.length !== cantxproSp.length) throw new NError(400, {format: true}, `'Procesos' and 'Cant_X_proceso' do not match`);
        logger.info(`Doing process credit data to Siigo format`);
        for (let i = 0; i < procesosSp.length; i++) {
            logger.info(`Making process on product register`);
            let procesoi = procesosSp[i].replace('Bordado','BORDADOS');
            procesoi = procesoi.replace('ensamblado','BORDADOS');
            procesoi = procesoi.replace('Confección','CONFECCION');
            procesoi = procesoi.replace('Estampado','ESTAMPADOS');
            procesoi = procesoi.replace('Lavado','LAVANDERIA');
            procesoi = procesoi.replace('Sublimado','ESTAMPADOS');
            procesoi = procesoi.replace('Pos-','');
            procesoi = procesoi.replace('Post-','');
            procesoi = procesoi.replace('Pre-','');
            procesoi = procesoi.trim();
            let cuenta = 0, linea: number, grupo: number, codigo: number;
            let confLava: string[] = [];
            let temp;
            if (producLider[refItem] !== undefined)
                confLava = producLider[refItem][4].split(',');
            switch (procesoi) {
                case 'CONFECCION':
                    cuenta = CConfeccion;
                    temp = getServiceCode(confLava[0], FILES_NAME.CodesNameServi);
                    linea  = parseInt(temp[0]);
                    grupo  = parseInt(temp[1]);
                    codigo = parseInt(temp[2]);
                    break;
                case 'BORDADOS':
                    cuenta = CBordados;
                    temp = getServiceCode(procesoi, FILES_NAME.CodesNameServi);
                    linea  = parseInt(temp[0]);
                    grupo  = parseInt(temp[1]);
                    codigo = parseInt(temp[2]);
                    break;
                case 'LAVANDERIA':
                    cuenta = CLavanderia;
                    temp = getServiceCode(confLava[1], FILES_NAME.CodesNameServi);
                    linea  = parseInt(temp[0]);
                    grupo  = parseInt(temp[1]);
                    codigo = parseInt(temp[2]);
                    break;
                case 'ESTAMPADOS':
                    cuenta = CEstampado;
                    temp = getServiceCode(procesoi, FILES_NAME.CodesNameServi);
                    linea  = parseInt(temp[0]);
                    grupo  = parseInt(temp[1]);
                    codigo = parseInt(temp[2]);
                    break;
                default:
                    throw new NError(404, {format:true}, `This process ${procesosSp[i]} do not exits in the system`);
            }
            const cantxproi = parseInt(cantxproSp[i]);
            let register = new SiigoFormat(
                2,
                cuenta,
                'C',
                `${procesoi} - OP ${op}`,
                cantxprocSum*cantxproi,
                12,
                "",
                ""
            );
            register.setLineaProducto(linea);
            register.setGrupoProducto(grupo);
            register.setCodigoProducto(codigo);
            register.setCodigoBodega(procesoi, FILES_NAME.CodesNameProce);
            logger.info(`Register has 'Bodega' codes`);
            if (coleccion.has(op)) {
                register.setSecuencia(secuencia);
                coleccion.get(op)?.push(register);
                logger.info(`Added process register to OP ${op}`);
            } else {
                register.setSecuencia(secuencia);
                coleccion.set(op, [register]);
                logger.info(`Added process register to OP ${op}`);
            }
            secuencia = secuencia + 1;
        }
        logger.info(`Doing debit data to Siigo format`);
        for (let i = 0; i < items.length; i++) {
            logger.info(`Making product on process register`);
            const cliente   = items[i]['Cliente'];
            const color     = items[i]['Color'];
            const ref       = items[i]['Referencia Producto Terminado'];
            const talla     = items[i]['Talla'];            
            const ingreso   = items[i]['Cantidad Ingreso'];
            const ingresInt = parseInt(ingreso);
            let register = new SiigoFormat(
                2,
                CTerminado,
                'D',
                `OP ${op}`,
                ingresInt,
                12,
                "1"
            );
            register.setLineaProducto(3);
            register.setGrupoProducto(parseInt(ref.split('-')[0]));
            register.setCodigoProducto(parseInt(ref.split('-')[1]));
            logger.info(`Register has Siigo codes`);
            register.setColor(color, FILES_NAME.CodesNamecolor);
            logger.info(`Register has Color code`);
            register.setTalla(talla, FILES_NAME.CodesNameTalla);
            logger.info(`Register has 'Talla'`);
            register.setCodigoClient(cliente, FILES_NAME.CodesNameClien, FILES_NAME.CodesNameBodeg);
            logger.info(`Register has 'Client'`);
            if (coleccion.has(op)) {
                register.setSecuencia(secuencia);
                coleccion.get(op)?.push(register);
                logger.info(`Added product on process register to OP ${op}`);
            } else {
                register.setSecuencia(secuencia);
                coleccion.set(op, [register]);
                logger.info(`Added product on process register to OP ${op}`);
            }
        }
    }
    const JSONDATA = JSON.stringify(Object.fromEntries(coleccion));
    fs.writeFileSync(`uploads/${FILES_NAME.dataFormat2}.json`, JSONDATA);
    logger.info(`Credit process information now has a Siigo format`);
    return `uploads/${FILES_NAME.dataFormat2}.json`;
}

const doDebit1 = () => {
    logger.info(`Reading data, 'Tallas' and 'refProds' JSON files`);
    const data: JSONInterfaceFormat = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.dataFormat1}.json`, 'utf-8'));
    const tallas: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosTallas}.json`, 'utf-8'));
    const refColor: JSONInterfaceData = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.LiderProds}.json`, 'utf-8'));
    for (const op in data) {
        const tallasOp = tallas[op];
        const secuencia = data[op].length + 1;        
        if (tallasOp) {
            logger.info(`Making debit register to OP ${op}`);
            for (let i = 0; i < tallasOp.length; i++) {
                logger.info(`Making debit register`);
                const item = tallasOp[i];
                let cantidad = parseFloat(item['cant_asignada']);
                let register = new SiigoFormat(
                    1,
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
                logger.info(`Register has Siigo codes`);
                register.setCodigoBodega(item['c_razon_social'], FILES_NAME.CodesNameBodeg);
                logger.info(`Register has 'Bodega'`);
                register.setTalla(item['c_id_talla'], FILES_NAME.CodesNameTalla);
                logger.info(`Register has 'Talla'`);
                try {
                    logger.info(`Register has 'Color'`);
                    register.setColor(refColor[ref][0], FILES_NAME.CodesNamecolor);
                } catch (error) {
                    logger.info(`Register does not has 'Color'`);
                    register.setColor('BLANCO', FILES_NAME.CodesNamecolor);
                }
                data[op].push(register);
            }
        } else {
            logger.info(`OP ${op} do not have 'Talla' info. Making debit register`);
            let cantidad = 0;
            let talla = 35;
            const ref: string = getPropertyFormatByOP(op, 'ref');
            const taller: string = getPropertyFormatByOP(op, 'taller');
            let register = new SiigoFormat(
                1,
                1410053100,
                'D',
                `OP${op}`,
                cantidad,
                0,
                '100'
            );
            register.setSecuencia(secuencia);
            register.setCodigosSiigo(ref, FILES_NAME.CodesNameProds);
            logger.info(`Register has Siigo codes`);
            register.setCodigoBodega(taller, FILES_NAME.CodesNameBodeg);
            logger.info(`Register has 'Bodega`);
            register.setTalla(talla.toString(), FILES_NAME.CodesNameTalla);
            logger.info(`Register has 'Talla'`);
            data[op].push(register);
        }
    }
    const JSONDATA = JSON.stringify(data);
    fs.writeFileSync(`uploads/${FILES_NAME.dataFormat1}.json`, JSONDATA);
    logger.info(`Debit information now has a Siigo format`);
    return `uploads/${FILES_NAME.dataFormat1}.json`;
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
    const insumosData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosInsumos}.json`, 'utf-8'));
    const telasData: JSONInterfaceExcel = JSON.parse(fs.readFileSync(`uploads/${FILES_NAME.CreditosTelas}.json`, 'utf-8'));
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

const doExcel = (data: JSONInterfaceFormat, orders: string[], i: number, type: number): ExcelJS.Workbook => {
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`O${type}`);
    worksheet = doExcelStyleSiigo(worksheet);

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

    return workbook;
}

export const generateDataToFormat1 = async (filename: string, orders: string[], docNumber: number) => {
    logger.info(`Doing credit data to Siigo format`);
    let pathData = doDataToFormat1();
    logger.info(`Doing debit data to Siigo format`);
    pathData = doDebit1();
    const data: JSONInterfaceFormat = JSON.parse(fs.readFileSync(pathData, 'utf-8'));
    let i = docNumber;
    logger.info(`Generating xlsx data`);
    const workbook = doExcel(data, orders, i, 1);
    logger.info(`Generated xlsx`);
    const name = `uploads/${filename}.xlsx`
    await workbook.xlsx.writeFile(name);
    return name;
}

export const generateDataToFormat2 = async (filename: string, orders: string[], docNumber: number) => {
    logger.info(`Doing credit data to Siigo format`);
    let pathData = doDataToFormat2();
    const data: JSONInterfaceFormat = JSON.parse(fs.readFileSync(pathData, 'utf-8'));
    let i = docNumber;
    logger.info(`Generating xlsx data`);
    const workbook = doExcel(data, orders, i, 2);
    logger.info(`Generated xlsx`);
    const name = `uploads/${filename}.xlsx`
    await workbook.xlsx.writeFile(name);
    return name;
}

export const getCodesByName = (description: string, type: string): ResponseCodesByName => {
    let linea_producto: string, grupo_producto: string, codigo_producto: string;
    const tablaEqui: JSONEquivalencia = JSON.parse(fs.readFileSync('uploads/equivalencias.json', 'utf-8'));
    try {
        let values = tablaEqui[type][description];
        if (values === undefined) throw new Error('undefined');
        linea_producto = (values !== undefined || values[0] !== '') ? values[0] : '0';
        grupo_producto = (values !== undefined || values[1] !== '') ? values[1] : '0';
        codigo_producto = (values !== undefined || values[2] !== '') ? values[2] : '0';
    } catch (error) {
        let path = '';
        switch (type) {
            case FILES_NAME.CodesNameInsum:
                path = `uploads/${FILES_NAME.SiigoInsum}.json`;
                break;
            case FILES_NAME.CodesNameTelas:
                path = `uploads/${FILES_NAME.SiigoTelas}.json`;
                break;
            case FILES_NAME.CodesNameProds:
                path = `uploads/${FILES_NAME.SiigoProds}.json`;
                break;
            case FILES_NAME.CodesNameTalla:
                path = `uploads/${FILES_NAME.Tallas}.json`;
                break;
            case FILES_NAME.CodesNamecolor:
                path = `uploads/${FILES_NAME.Colores}.json`;
                break;
            case FILES_NAME.CodesNameBodeg:
                path = `uploads/${FILES_NAME.Bodegas}.json`;
                break;
            case FILES_NAME.CodesNameProce:
                path = `uploads/${FILES_NAME.Procesos}.json`;
                break;
            case FILES_NAME.CodesNameClien:
                path = `uploads/${FILES_NAME.Clientes}.json`;
                break;
            case FILES_NAME.CodesNameServi:
                path = `uploads/${FILES_NAME.LiderServi}.json`;
                break;
            default:
                throw new NError(404, {format:true}, `The equivalent table do not have ${type} type register`);
        }
        const siigo = JSON.parse(fs.readFileSync(path, 'utf-8'));
        if (description !== undefined) {
            let values = getSiigoCode(description, siigo, type === FILES_NAME.CodesNameProds);
            linea_producto = (values !== undefined || values[0] !== '') ? values[0] : '0';
            grupo_producto = (values !== undefined || values[1] !== '') ? values[1] : '0';
            codigo_producto = (values !== undefined || values[2] !== '') ? values[2] : '0';
            tablaEqui[type][description] = values;
            fs.writeFileSync(`uploads/equivalencias.json`, JSON.stringify(tablaEqui));
            logger.info(`Equivalent JSON file updated`);
        } else {
            linea_producto = '0';
            grupo_producto = '0';
            codigo_producto = '0';
        }
    }
    return {linea_producto, grupo_producto, codigo_producto};
}
