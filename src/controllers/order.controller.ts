import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import path from "path";

export const setOrderInsumos = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readInputFile(path_file, 'productosInsumos', 1);
    res.status(204).json();
}

export const setOrderTelas = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readInputFile(path_file, 'productosTelas', 2);
    res.status(204).json();
}

export const setOrderTerminados = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 0, 4);
    res.status(204).json();
}

export const generateSiigoFormat = async (req: Request, res: Response) => {
    const filename = '';
    const path_ = await funct.generateDataToFormat();
    
    
    
    const realPath = '';
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}