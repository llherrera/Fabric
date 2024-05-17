import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import path from "path";

import insumo_lider from '../../uploads/insumos_lider.json' assert { type: 'json' };
import telas_lider from '../../uploads/Telas Lider.json' assert { type: 'json' };
import terminado_lider from '../../uploads/Producto terminado Líder.json' assert { type: 'json' };

import insumo_siigo from '../../uploads/insumos_siigo.json' assert { type: 'json' };
import telas_siigo from '../../uploads/Telas_Siigo.json' assert { type: 'json' };
import terminado_siigo from '../../uploads/Producto Terminado SIIGO.json' assert { type: 'json' };

import colores from '../../uploads/COLORES.json' assert { type: 'json' };
import tallas from '../../uploads/TALLA.json' assert { type: 'json' };
import bodegas from '../../uploads/BODEGAS.json' assert { type: 'json' };

export const getFile = async (req: Request, res: Response) => {
    const path_ = await funct.generateExcel1([]);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=name.xlsx`);
    res.sendFile(realPath);
}

export const someName = async (req: Request, res: Response) => {
    await funct.testExcel(req.body.path);
    res.json({msg: 'File uploaded'});
}

export const generateInsumosSiigoFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 0, 4);
    res.status(204).json();
}

export const generateInsumoLiderFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 1, 2);
    res.status(204).json();
}

export const generateTelasSiigoFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 2, 4);
    res.status(204).json();
}

export const generateTelasLiderFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 3, 1);
    res.status(204).json();
}

export const generateTerminadoSiigoFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 4, 5);
    res.status(204).json();
}

export const generateTerminadoLiderFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 1, 5, 1);
    res.status(204).json();
}

export const generateTallasFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 7, 0, 2);
    res.status(204).json();
}

export const generateColoresFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 7, 1, 2);
    res.status(204).json();
}

export const generatebodegasFile = async (req: Request, res: Response) => {
    await funct.readileToGenerateJsonFile(req.body.path, 7, 2, 2);
    res.status(204).json();
}

export const generateTableMatched = async (req: Request, res: Response) => {
    const { type, catalogue } = req.query;
    let data;
    if (type === 'insumos') {
        data = await funct.createTableMatch(insumo_lider, insumo_siigo, colores);
    } else if (type === 'telas') {
        data = await funct.createTableMatch(telas_lider, telas_siigo, colores);
    } else if (type === 'terminado') {
        data = await funct.createTableMatch(terminado_lider, terminado_siigo, colores);
    }

    //if (catalogue === 'color') {
    //} else if (catalogue === 'talla') {
    //    res.json({msg: 'To Do'})
    //} else if (catalogue === 'bodega') {
    //    res.json({msg: 'To Do'})
    //}
    res.json(data)
}

export const getTableMatched = async (req: Request, res: Response) => {
    //const path_ = await funct.createTableMatch();
    //const realPath = path.resolve(path_);
    //res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //res.setHeader('Content-Disposition', `attachment;filename=name.xlsx`);
    //res.sendFile(realPath);
}