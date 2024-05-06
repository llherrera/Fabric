import { Router } from "express";
import { someName, getFile } from '../controllers';
import { fileManager } from '../middleware';
import { Path } from '../utils/constants';

const router = Router();
const { Load } = Path;

router.get(Load, getFile);
router.post(Load, fileManager, someName);
//router.post(Load, someName);

export { router as LoadRouter }