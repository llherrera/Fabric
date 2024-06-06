import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import { FILES_NAME } from "../utils/constants.ts";
import fs from 'fs';
import path from "path";

export const generateInsumosSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 0, 4, FILES_NAME.SiigoInsum);
        msg = 'Se ha creado el fichero de insumos de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderInsum}.json`))
            return res.status(201).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los insumos, falta crear el fichero de insumos de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateInsumoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 1, 2, FILES_NAME.LiderInsum);
        msg = 'Se ha creado el fichero de insumos de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoInsum}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los insumos, falta crear el fichero de insumos de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderInsum}.json`, `uploads/${FILES_NAME.SiigoInsum}.json`, FILES_NAME.CodesNameInsum, false);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateTelasSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 2, 4, FILES_NAME.SiigoTelas);
        msg = 'Se ha creado el fichero de telas de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoTelas}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de las telas, falta crear el fichero de telas de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateTelasLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 3, 1, FILES_NAME.LiderTelas);
        msg = 'Se ha creado el fichero de telas de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderTelas}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de las telas, falta crear el fichero de telas de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderTelas}.json`, `uploads/${FILES_NAME.SiigoTelas}.json`, FILES_NAME.CodesNameTelas, false);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateTerminadoSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 4, 5, FILES_NAME.SiigoProds);
        msg = 'Se ha creado el fichero de productos de Siigo';
        if (!fs.existsSync(`uploads/${FILES_NAME.LiderProds}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los productos, falta crear el fichero de productos de Lider.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateTerminadoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 1, 5, 1, FILES_NAME.LiderProds);
        msg = 'Se ha creado el fichero de productos de Lider';
        if (!fs.existsSync(`uploads/${FILES_NAME.SiigoProds}.json`))
            return res.status(200).json({msg: `${msg}. No se tiene la información necesaria para poder crear las equivalencias de los productos, falta crear el fichero de productos de Siigo.`});
        funct.addEquivalent(`uploads/${FILES_NAME.LiderProds}.json`, `uploads/${FILES_NAME.SiigoProds}.json`, FILES_NAME.CodesNameProds, true);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias.`});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateTallasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 7, 0, 2, FILES_NAME.Tallas);
        msg = 'Se ha creado el fichero de Tallas';
        funct.addCatalogue(`uploads/${FILES_NAME.Tallas}.json`, FILES_NAME.CodesNameTalla);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generateColoresFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 7, 1, 2, FILES_NAME.Colores);
        msg = 'Se ha creado el fichero de Colores';
        funct.addCatalogue(`uploads/${FILES_NAME.Colores}.json`, FILES_NAME.CodesNamecolor);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const generatebodegasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    let msg: string = '';
    try {
        await funct.readFileToGenerateJsonFile(path_file, 7, 2, 2, FILES_NAME.Bodegas);
        msg = 'Se ha creado el fichero de Bodegas';
        funct.addCatalogue(`uploads/${FILES_NAME.Bodegas}.json`, FILES_NAME.CodesNameBodeg);
        res.status(200).json({msg: `${msg}. Se ha actualizado la tabla de equivalencias`});    
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const getEquivalencesTable = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    const filename = 'Tabla-Equivalencias';
    const path_ = await funct.doMatchColorInFile(path_file, filename);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}

export const doCatalogueTable = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    const filename = 'Tabla-Equivalencias';
    const path_ = await funct.doCatalogueTable(path_file, filename);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}

export const generateTable = async (req: Request, res: Response) => {
    const filename = 'Tabla-Equivalencias';
    const path_ = await funct.generateEquivalentTable(filename);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}