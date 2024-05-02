import { Request, Response } from "express";

export const someName = async (req: Request, res: Response) => {
    res.json({msg: 'completed'})
}