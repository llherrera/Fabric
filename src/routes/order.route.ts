import { Router } from "express";
import { setOrderInsumos, setOrderTelas, setOrderTerminados, setOrderTallas, generateSiigoFormat } from '../controllers/order.controller';
import { fileManager } from '../middleware/index';
import { Path } from '../utils/constants';

const router = Router();
const {  } = Path;


router.get('/', generateSiigoFormat);

router.post(Path.Insumos, fileManager, setOrderInsumos);
router.post(Path.Tallas, fileManager, setOrderTallas);
router.post(Path.Telas, fileManager, setOrderTelas);


export { router as orderRouter };