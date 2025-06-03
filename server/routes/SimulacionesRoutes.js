import { Router } from 'express';
import SimulacionesController from '../controllers/SimulacionesController.js';
import { validJWT } from '../middleware/validarJWT.js';

export const router = Router()

router.post('/',[validJWT], SimulacionesController.funSimularFuncionNormal)
router.post('/brecha',[validJWT], SimulacionesController.funSimularFuncionBrecha)