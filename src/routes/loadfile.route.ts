import { Router, Response, NextFunction } from "express";
import { someName } from '../controllers';
import { fileManager } from '../middleware';
import { Path } from '../utils/constants';

const router = Router();
const { Load } = Path;

router.post(Load, fileManager, someName);

export { router as LoadRouter }