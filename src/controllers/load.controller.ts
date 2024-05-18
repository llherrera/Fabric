import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import path from "path";

import insumo_lider from '../../uploads/insumos_lider.json' assert { type: 'json' };
import telas_lider from '../../uploads/Telas Lider.json' assert { type: 'json' };
import terminado_lider from '../../uploads/Producto terminado Líder.json' assert { type: 'json' };

import colores from '../../uploads/COLORES.json' assert { type: 'json' };
import insumo_colores from '../../uploads/insumo_colores.json' assert { type: 'json' };

export const getFile = async (req: Request, res: Response) => {
    const path_ = await funct.generateExcel1([]);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=name.xlsx`);
    res.sendFile(realPath);
}

export const someName = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.testExcel(path_file);
    res.json({msg: 'File uploaded'});
}

export const generateInsumosSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 0, 4);
    res.status(204).json();
}

export const generateInsumoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 1, 2);
    res.status(204).json();
}

export const generateTelasSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 2, 4);
    res.status(204).json();
}

export const generateTelasLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 3, 1);
    res.status(204).json();
}

export const generateTerminadoSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 4, 5);
    res.status(204).json();
}

export const generateTerminadoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 1, 5, 1);
    res.status(204).json();
}

export const generateTallasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 7, 0, 2);
    res.status(204).json();
}

export const generateColoresFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 7, 1, 2);
    res.status(204).json();
}

export const generatebodegasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readileToGenerateJsonFile(path_file, 7, 2, 2);
    res.status(204).json();
}

export const generateTableColorMatched = async (req: Request, res: Response) => {
    let data1, data2, data3;
    data1 = funct.createTableColorMatch(insumo_lider, colores, 'insumo_colores');
    data2 = funct.createTableColorMatch(telas_lider, colores, 'telas_colores');
    data3 = funct.createTableColorMatch(terminado_lider, colores, 'terminado_colores');

    res.json({data1, data2, data3})
}

export const getColorTableMatched = async (req: Request, res: Response) => {
    const filename = 'tabla_insumos_colores';
    const path_ = await funct.generateExcelColor(insumo_colores, filename);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}

export const addColorCode = async (req: Request, res: Response) => {
    const { path_file } = req.body
    const filename = 'filename';
    const path_ = await funct.doMatchColorInFile(path_file, filename);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}