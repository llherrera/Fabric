import { Request, Response, NextFunction } from "express";
import multer from 'multer';

export interface ExtRequest extends Record<string, any> {};

const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedMimes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Invalid file type'));
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

const upload = multer({ 
    fileFilter,
    storage
});

export const fileManager = async (req: any, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({msg: err.message});
        } else if (err) {
            return res.status(400).json({msg: `Error uploading file. ${err.message}`});
        }
        try {
            const file = req.file;
            req.body = {...req.body, path_file: file.path}
            next();
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    });
}