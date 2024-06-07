import { Router } from "express";
import { setOrderInsumos, setOrderTelas, setOrderTerminados, setOrderTallas, generateSiigoFormat } from '../controllers/order.controller';
import { fileManager } from '../middleware/index';
import { Path } from '../utils/constants';

const router = Router();
const {  } = Path;


router.get('/', generateSiigoFormat);

router.post('/insumos', fileManager, setOrderInsumos);
router.post('/tallas', fileManager, setOrderTallas);
router.post('/telas', fileManager, setOrderTelas);


export { router as orderRouter };