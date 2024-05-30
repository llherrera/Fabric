import { Router } from "express";
import * as controller from '../controllers/index.ts';
import { fileManager } from '../middleware/index.ts';
import { Path } from '../utils/constants.ts';

const router = Router();
const { Load } = Path;

//añadir la rutina para generar las equivalencias cuando se cargue estos ficheros
router.post('/insumos-siigo', fileManager, controller.generateInsumosSiigoFile);
router.post('/telas-siigo', fileManager, controller.generateTelasSiigoFile);
router.post('/productos-siigo', fileManager, controller.generateTerminadoSiigoFile);


router.post('/insumos-lider', fileManager, controller.generateInsumoLiderFile);
router.post('/telas-lider', fileManager, controller.generateTelasLiderFile);
router.post('/productos-lider', fileManager, controller.generateTerminadoLiderFile);


router.post('/tallas', fileManager, controller.generateTallasFile);
router.post('/colores', fileManager, controller.generateColoresFile);
router.post('/bodegas', fileManager, controller.generatebodegasFile);

//cambiar para que solo sea para obtener el fichero y no crearlo en el proceso
router.post('/equivalencias', fileManager, controller.getEquivalencesTable); // renombrar la función para que no sea confusa


export { router as LoadRouter };