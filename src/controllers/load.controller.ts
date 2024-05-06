import { Request, Response } from "express";
import { generateExcel1, testExcel } from "../utils/functions.utils";
import path from "path";

export const getFile = async (req: Request, res: Response) => {
    const path_ = await generateExcel1([]);
    const realPath = path.resolve(path_);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment;filename=name.xlsx`);
    res.sendFile(realPath);
}

export const someName = async (req: Request, res: Response) => {
    await testExcel(req.body.path);
    res.send({msg: 'File uploaded'});
}