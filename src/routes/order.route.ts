import { Router } from "express";
import { setOrderInsumos, setOrderTelas, setOrderTerminados, setOrderTallas, generateSiigoFormat, InsumosEquivalent, TelasEquivalent, ProductosEquivalent } from '../controllers/order.controller.ts';
import { fileManager } from '../middleware/index.ts';
import { Path } from '../utils/constants.ts';

const router = Router();
const {  } = Path;


router.get('/', generateSiigoFormat);

router.get('/insumosequi', InsumosEquivalent);
router.get('/telasequi', TelasEquivalent);
router.get('/productosequi', ProductosEquivalent);

router.post('/insumos', fileManager, setOrderInsumos);
router.post('/tallas', fileManager, setOrderTallas);
router.post('/telas', fileManager, setOrderTelas);


export { router as orderRouter };