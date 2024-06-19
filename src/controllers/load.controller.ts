import { Request, Response } from "express";
import * as funct from "../utils/functions.utils";
import fs from 'fs';
import path from "path";
import { FILES_NAME } from "../utils/constants";
import { logger } from '../utils/logger.utils';
import { NError } from '../utils/errors.utils';

export const generateInsumosSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Insumos' codes in Siigo");
        await funct.readFileToGenerateJsonFile(path_file, 1, 0, 4, FILES_NAME.SiigoInsum);
        logger.info("Created JSON with 'Insumos' codes in Siigo");
        msg = 'Se ha creado el fichero de insumos de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderInsum}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los insumos, falta crear el fichero de insumos de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateInsumoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Insumos' codes in Lider");
        await funct.readFileToGenerateJsonFile(path_file, 1, 1, 2, FILES_NAME.LiderInsum);
        logger.info("Created JSON with 'Insumos' codes in Lider");
        msg = 'Se ha creado el fichero de insumos de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoInsum}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los insumos, falta crear el fichero de insumos de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTelasSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Telas' codes in Siigo");
        await funct.readFileToGenerateJsonFile(path_file, 1, 2, 4, FILES_NAME.SiigoTelas);
        logger.info("Created JSON with 'Telas' codes in Siigo");
        msg = 'Se ha creado el fichero de telas de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoTelas}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de las telas, falta crear el fichero de telas de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTelasLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Telas' codes in Lider");
        await funct.readFileToGenerateJsonFile(path_file, 1, 3, 1, FILES_NAME.LiderTelas);
        logger.info("Created JSON with 'Telas' codes in Lider");
        msg = 'Se ha creado el fichero de telas de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderTelas}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de las telas, falta crear el fichero de telas de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTerminadoSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Productos' codes in Siigo");
        await funct.readFileToGenerateJsonFile(path_file, 1, 4, 5, FILES_NAME.SiigoProds);
        logger.info("Created JSON with 'Productos' codes in Siigo");
        msg = 'Se ha creado el fichero de productos de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderProds}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los productos, falta crear el fichero de productos de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTerminadoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Productos' codes in Lider");
        await funct.readFileToGenerateJsonFile(path_file, 1, 5, 1, FILES_NAME.LiderProds);
        logger.info("Created JSON with 'Productos' codes in Lider");
        msg = 'Se ha creado el fichero de productos de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoProds}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los productos, falta crear el fichero de productos de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTallasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Tallas' codes");
        await funct.readFileToGenerateJsonFile(path_file, 7, 0, 2, FILES_NAME.Tallas);
        logger.info("Created JSON with 'Tallas' codes");
        msg = 'Se ha creado el fichero de Tallas';
        funct.addCatalogue(`uploads/${FILES_NAME.Tallas}.json`, FILES_NAME.CodesNameTalla);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateColoresFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Colores' codes");
        await funct.readFileToGenerateJsonFile(path_file, 7, 1, 2, FILES_NAME.Colores);
        logger.info("Created JSON with 'Colores' codes");
        msg = 'Se ha creado el fichero de Colores';
        funct.addCatalogue(`uploads/${FILES_NAME.Colores}.json`, FILES_NAME.CodesNamecolor);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateBodegasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Bodegas' codes");
        await funct.readFileToGenerateJsonFile(path_file, 7, 2, 2, FILES_NAME.Bodegas);
        logger.info("Created JSON with 'Bodegas' codes");
        msg = 'Se ha creado el fichero de Bodegas';
        funct.addCatalogue(`uploads/${FILES_NAME.Bodegas}.json`, FILES_NAME.CodesNameBodeg);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateProcessFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Procesos' codes");
        await funct.readFileToGenerateJsonFile(path_file, 1, 3, 2, FILES_NAME.Procesos);
        logger.info("Created JSON with 'Procesos' codes");
        msg = 'Se ha creado el fichero de Procesos';
        funct.addCatalogue(`uploads/${FILES_NAME.Procesos}.json`, FILES_NAME.CodesNameProce);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateClientFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    let msg: string = '';
    try {
        logger.info("Start generating JSON with 'Clientes' codes");
        await funct.readFileToGenerateJsonFile(path_file, 1, 4, 2, FILES_NAME.Clientes);
        logger.info("Created JSON with 'Clientes' codes");
        msg = 'Se ha creado el fichero de Clientes';
        funct.addCatalogue(`uploads/${FILES_NAME.Clientes}.json`, FILES_NAME.CodesNameClien);
        logger.info("Updated Equivalent table");
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateAndGetEquivalencesTable = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        const filename = 'Tabla-Equivalencias';
        logger.info("Reading XLSX codes to generate JSON and XLSX from equivalent table");
        const path_ = await funct.doTable(path_file, filename);
        logger.info("Created XLSX from equivalent table");
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const doCatalogueTable = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        const filename = 'Tabla-Equivalencias';
        logger.info("Reading XLSX catalogue to generate JSON and XLSX from equivalent table");
        const path_ = await funct.doCatalogueTable(path_file, filename);
        logger.info("Created XLSX from equivalent table");
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        res.status(500).json({msg: error.message});
    }
}

export const generateTable = async (req: Request, res: Response) => {
    try {
        const filename = 'Tabla-Equivalencias';
        logger.info("Start generating XLSX from equivalent table");
        const path_ = await funct.generateEquivalentTable(filename);
        logger.info("Created XLSX from equivalent table");
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        if (error instanceof NError)
            res.status(error.code).json({msg: error.message});
        res.status(500).json({msg: error.message});
    }
}