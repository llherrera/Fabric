import { Request, Response } from "express";
import * as funct from "../utils/functions.utils.ts";
import path from "path";

export const setOrderInsumos = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (path_file || path_file === '') return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    await funct.readInputFile(path_file, 'productosInsumos', 1, 2);
    res.status(204).json();
}

export const setOrderTelas = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (path_file || path_file === '') return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    await funct.readInputFile(path_file, 'productosTelas', 2, 2);
    res.status(204).json();
}

export const setOrderTerminados = async (req: Request, res: Response) => { // no se usa aun
    const { path_file } = req.body;
    if (path_file || path_file === '') return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    await funct.readInputFile(path_file, 'productosTerminados', 1, 2);
    res.status(204).json();
}

export const setOrderTallas = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    await funct.readInputFile(path_file, 'productosTallas', 1, 1);
    res.status(204).json();
}

export const generateSiigoFormat = async (req: Request, res: Response) => {
    const { ops, docNumber } = req.body;
    if (docNumber) return res.status(400).json({ msg: `Bad Request. Missing doc's number field` }); // es un entero
    if (ops) return res.status(400).json({ msg: `Bad Request. Missing production orders field` }); // tipo: 19634,19600,19452

    try {
        const doc_number = parseInt(docNumber);

        const filename = 'O1-i';
        const path_ = await funct.generateDataToFormat(filename);
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (e) {
        console.log(`Error: ${e.message}`);
        return res.status(500).json({ msg: e.message });
    }
}