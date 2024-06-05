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
    const { ops, docNumber } = req.query;
    if (docNumber === undefined) return res.status(400).json({ msg: `Bad Request. Missing doc's number field` });
    if (ops === undefined) return res.status(400).json({ msg: `Bad Request. Missing production orders field` });

    try {
        const ops_ = ops as string
        const doc_number = parseInt(docNumber?.toString());
        let orders: string[] = ops_.split(',');
        orders = orders.filter(e => e !== '');
        orders.length > 0 && orders.forEach(item => {
            if (isNaN(parseInt(item))) throw Error(`Invalid value, ${item}`)
        });

        const filename = 'O1-i';
        const path_ = await funct.generateDataToFormat(filename, orders, doc_number);
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (e) {
        console.log(`Error: ${e.message}`);
        return res.status(500).json({ msg: e.message });
    }
}

export const InsumosEquivalent = async (req: Request, res: Response) => {
    await funct.addEquivalent('uploads/insumos_lider.json', 'uploads/insumos_siigo.json', 'Códigos Insumos', false);
    res.json({});
}

export const TelasEquivalent = async (req: Request, res: Response) => {
    await funct.addEquivalent('uploads/Telas Lider.json', 'uploads/Telas_Siigo.json', 'Códigos Telas', false);
    res.json({});
}

export const ProductosEquivalent = async (req: Request, res: Response) => {
    await funct.addEquivalent('uploads/Producto terminado Líder.json', 'uploads/Producto Terminado SIIGO.json', 'Códigos Terminados', true);
    res.json({});
}