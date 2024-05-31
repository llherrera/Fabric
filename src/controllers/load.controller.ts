import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import path from "path";

export const generateInsumosSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 0, 4);
    res.status(204).json();
}

export const generateInsumoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 1, 2);
    res.status(204).json();
}

export const generateTelasSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 2, 4);
    res.status(204).json();
}

export const generateTelasLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 3, 1);
    res.status(204).json();
}

export const generateTerminadoSiigoFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 4, 5);
    res.status(204).json();
}

export const generateTerminadoLiderFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 1, 5, 1);
    res.status(204).json();
}

export const generateTallasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 7, 0, 2);
    res.status(204).json();
}

export const generateColoresFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 7, 1, 2);
    res.status(204).json();
}

export const generatebodegasFile = async (req: Request, res: Response) => {
    const { path_file } = req.body
    await funct.readFileToGenerateJsonFile(path_file, 7, 2, 2);
    res.status(204).json();
}

export const getEquivalencesTable = async (req: Request, res: Response) => {
    const { path_file } = req.body
    const filename = 'Tabla de equivalencias';
    const path_ = await funct.doMatchColorInFile(path_file, filename);//esto debe cambiar, esta funcion se tiene que ejecutar cuando se suba un nuevo fichero de Lider o Siigo
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
    res.sendFile(realPath);
}