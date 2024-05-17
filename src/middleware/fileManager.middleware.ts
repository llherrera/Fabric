import { Request, Response, NextFunction } from "express";
import { Path } from "../utils/constants.ts";
import multer from 'multer';

export interface ExtRequest extends Record<string, any> {};

const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedMimes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, "uploads");
    },
    filename: function (req: Request, file: any, cb: any) {
      cb(null,file.originalname);
    },
});

//const storage = multer.memoryStorage();

const upload = multer({ 
    fileFilter,
    storage
});

export const fileManager = async (req: any, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                msg: err.message
            });
        } else if (err) {
            return res.status(500).json({
                msg: 'Error uploading file',
                error: err.message
            });
        }
        try {
            const file = req.file;
            req.body = {...req.body, path: file.path}
            next();
        } catch (error) {
            res.status(500).json({msg: error});
        }
    });
}