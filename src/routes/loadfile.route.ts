import { Router } from "express";
import * as controller from '../controllers/index';
import { fileManager } from '../middleware/index';
import { Path } from '../utils/constants';

const router = Router();

router.post(Path.Codes, fileManager, controller.generateAndGetEquivalencesTable);
router.post(Path.Catalogue, fileManager, controller.doCatalogueTable);


router.post(Path.SiigoIns, fileManager, controller.generateInsumosSiigoFile);
router.post(Path.SiigoTel, fileManager, controller.generateTelasSiigoFile);
router.post(Path.SiigoPro, fileManager, controller.generateTerminadoSiigoFile);

router.post(Path.LiderIns, fileManager, controller.generateInsumoLiderFile);
router.post(Path.LiderTel, fileManager, controller.generateTelasLiderFile);
router.post(Path.LiderPro, fileManager, controller.generateTerminadoLiderFile);

router.post(Path.Tallas,  fileManager, controller.generateTallasFile);
router.post(Path.Colors,  fileManager, controller.generateColoresFile);
router.post(Path.Bodega,  fileManager, controller.generateBodegasFile);
router.post(Path.Process, fileManager, controller.generateProcessFile);
router.post(Path.Clients, fileManager, controller.generateClientFile);


router.get(Path.Equivalent, controller.generateTable);


export { router as LoadRouter };