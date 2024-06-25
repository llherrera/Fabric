import { Router } from "express";
import { setOrderInsumos, setOrderTelas, setOrderTerminados, setOrderTallas, generateSiigoFormatO1, setOrderProducts, generateSiigoFormatO2 } from '../controllers/order.controller';
import { fileManager } from '../middleware/index';
import { Path } from '../utils/constants';

const router = Router();

router.get(Path.O1, generateSiigoFormatO1);

router.post(Path.Insumos, fileManager, setOrderInsumos);
router.post(Path.Tallas, fileManager, setOrderTallas);
router.post(Path.Telas, fileManager, setOrderTelas);

router.get(Path.O2, generateSiigoFormatO2);

router.post(Path.Process, fileManager, setOrderProducts);

export { router as orderRouter };