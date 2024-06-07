import { Router } from "express";
import * as controller from '../controllers/index';
import { fileManager } from '../middleware/index';
import { Path } from '../utils/constants';

const router = Router();
const { Load } = Path;

router.post('/codigos', fileManager, controller.getEquivalencesTable);
router.post('/catalogo', fileManager, controller.doCatalogueTable);


router.post('/insumos-siigo', fileManager, controller.generateInsumosSiigoFile);
router.post('/telas-siigo', fileManager, controller.generateTelasSiigoFile);
router.post('/productos-siigo', fileManager, controller.generateTerminadoSiigoFile);

router.post('/insumos-lider', fileManager, controller.generateInsumoLiderFile);
router.post('/telas-lider', fileManager, controller.generateTelasLiderFile);
router.post('/productos-lider', fileManager, controller.generateTerminadoLiderFile);

router.post('/tallas', fileManager, controller.generateTallasFile);
router.post('/colores', fileManager, controller.generateColoresFile);
router.post('/bodegas', fileManager, controller.generatebodegasFile);


router.get('/equivalencias', controller.generateTable);


export { router as LoadRouter };