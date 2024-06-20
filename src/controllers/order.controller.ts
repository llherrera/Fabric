import { Request, Response } from "express";
import * as funct from "../utils/functions.utils";
import { FILES_NAME } from "../utils/constants";
import path from "path";
import { logger } from '../utils/logger.utils';

export const setOrderInsumos = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        logger.info("Start generating JSON with 'Insumos' credits");
        await funct.readInputFile(path_file, FILES_NAME.CreditosInsumos, 1, 2);
        logger.info("Created JSON with 'Insumos' credits");
        res.status(204).json();
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const setOrderTelas = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        logger.info("Start generating JSON with 'Telas' credits");
        await funct.readInputFile(path_file, FILES_NAME.CreditosTelas, 2, 2);
        logger.info("Created JSON with 'Telas' credits");
        res.status(204).json();
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const setOrderTerminados = async (req: Request, res: Response) => { // no se usa aun
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        logger.info("Start generating JSON with 'Productos' credits");
        await funct.readInputFile(path_file, FILES_NAME.CreditosTerminados, 1, 2);
        logger.info("Created JSON with 'Productos' credits");
        res.status(204).json();
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const setOrderTallas = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        logger.info("Start generating JSON with 'Tallas' debits");
        await funct.readInputFile(path_file, FILES_NAME.CreditosTallas, 1, 1);
        logger.info("Created JSON with 'Tallas' debits");
        res.status(204).json();
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const generateSiigoFormatO1 = async (req: Request, res: Response) => {
    const { ops, docNumber } = req.query;
//    if (docNumber === undefined) return res.status(400).json({ msg: `Bad Request. Missing doc's number field` });
//    if (ops === undefined) return res.status(400).json({ msg: `Bad Request. Missing production orders field` });

    try {
        const ops_ = ops?.toString() ?? '';
        const doc_number = parseInt(docNumber?.toString() ?? '1');
        let orders: string[] = ops_.split(',');
        orders = orders.filter(e => e !== '');
        orders.length > 0 && orders.forEach(item => {
            if (isNaN(parseInt(item))) throw Error(`Invalid value, ${item}`)
        });
        const filename = `O1-${orders.length === 0 ? 'i Historico' : orders.join('-')}`;
        logger.info(`Start generating products data in Siigo format of ${orders.length === 0 ? 'all OPs' : orders.join(',')}`);
        const path_ = await funct.generateDataToFormat1(filename, orders, doc_number);
        logger.info("Created data in Siigo format");
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const setOrderProducts = async (req: Request, res: Response) => {
    const { path_file } = req.body;
    if (!path_file || path_file === '') {
        logger.info(`File not found in path: ${path_file}`);
        return res.status(400).json({ msg: 'Bad Request. Missing file field' });
    }
    try {
        logger.info("Start generating JSON with 'Procesos' credits");
        await funct.readInputFile(path_file, FILES_NAME.CreditosProcesos, 1, 2);
        logger.info("Created JSON with 'Procesos' credits");
        res.status(204).json();
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}

export const generateSiigoFormatO2 = async (req: Request, res: Response) => {
    const { ops, docNumber } = req.query;
//    if (docNumber === undefined) return res.status(400).json({ msg: `Bad Request. Missing doc's number field` });

    try {
        const ops_ = ops?.toString() ?? '';
        const doc_number = parseInt(docNumber?.toString() ?? '1');
        let orders: string[] = ops_.split(',');
        orders = orders.filter(e => e !== '');
        orders.length > 0 && orders.forEach(item => {
            if (isNaN(parseInt(item))) throw Error(`Invalid value, ${item}`);
        });
        const filename = `O2-${orders.length === 0 ? 'i Historico' : orders.join('-')}`;
        logger.info(`Start generating process data in Siigo format of ${orders.length === 0 ? 'all OPs' : orders.join(',')}`);
        const path_ = await funct.generateDataToFormat2(filename, orders, doc_number);
        logger.info("Created data in Siigo format");
        const realPath = path.resolve(path_);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment;filename=${filename}.xlsx`);
        res.sendFile(realPath);
    } catch (error) {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ msg: error.message });
    }
}
