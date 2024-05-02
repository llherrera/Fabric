import { Request, Response, NextFunction } from "express";
import { Path } from "../utils/constants";

export interface ExtRequest extends Record<string, any> {}

const multer = require('multer');

const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedMimes = ['application/pdf'];
    if (allowedMimes.includes(file.mimetype) && req.path === Path.Load) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    fileFilter
});

export const fileManager = async (req: ExtRequest, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                msg: err.message
            });
        } else if (err) {
            return res.status(500).json({
                msg: 'Error uploading file',
                error: err
            });
        }
        try {
            const file = req.file
            console.log(file);
            
            next();
        } catch (error) {
            res.status(500).json({msg: error})
        }
            
        /*if (err instanceof multer.MulterError) {
            return res.status(400).json({
                message: err.message
            });
        } else if (err) {
            return res.status(500).json({
                message: 'Error uploading file'
            });
        }
        try {
            const { evidence } = req.body;
            const { name_file } = evidence;

            const file = req.file;
            const fileName = `Files/${Date.now()}-${name_file}`;
            const fileUpload = bucket.file(fileName);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (error: any) => {
                return res.status(500).json({
                    message: 'Error uploading file to firebase 1'
                });
            });

            blobStream.on('finish', () => {
                const name = encodeURI(fileUpload.name);
                const name_ = name.split('/').join('%2F');
                const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${name_}?alt=media`;
                req.body['file_link'] = url;
                next();
            });
            blobStream.end(file.buffer);
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error uploading file to firebase 2'
            });
        }*/
    });
}