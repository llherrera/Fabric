import { Router } from "express";
import { setOrderInsumos, setOrderTelas, setOrderTerminados, generateSiigoFormat } from '../controllers/order.controller.ts';
import { fileManager } from '../middleware/index.ts';
import { Path } from '../utils/constants.ts';

const router = Router();
const {  } = Path;


router.get('/', generateSiigoFormat);

router.post('/insumos', fileManager, setOrderInsumos);
router.post('/telas', fileManager, setOrderTelas);


export { router as orderRouter };