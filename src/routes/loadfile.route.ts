import { Router } from "express";
import * as controller from '../controllers/index.ts';
import { fileManager } from '../middleware/index.ts';
import { Path } from '../utils/constants.ts';

const router = Router();
const { Load } = Path;


router.get(Load, controller.getFile);
// router.post(Load, fileManager, controller.someName);

// borrar cuanto antes (cuando se tenga automatizado la carga de fichero y la generacion de la tabla de convergencia, de momento esta ruta genera la tabla mas no la envia)
router.get('/color-match', controller.generateTableColorMatched);
router.get('/color-table', controller.getColorTableMatched);


router.post('/insumos-siigo', fileManager, controller.generateInsumosSiigoFile);
router.post('/telas-siigo', fileManager, controller.generateTelasSiigoFile);
router.post('/terminado-siigo', fileManager, controller.generateTerminadoSiigoFile);


router.post('/insumos-lider', fileManager, controller.generateInsumoLiderFile);
router.post('/telas-lider', fileManager, controller.generateTelasLiderFile);
router.post('/terminado-lider', fileManager, controller.generateTerminadoLiderFile);


router.post('/tallas', fileManager, controller.generateTallasFile);
router.post('/colores', fileManager, controller.generateColoresFile);
router.post('/bodegas', fileManager, controller.generatebodegasFile);


router.post('/add-color-code', fileManager, controller.addColorCode);


export { router as LoadRouter };