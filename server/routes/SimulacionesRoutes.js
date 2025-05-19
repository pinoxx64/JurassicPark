import { Router } from 'express';
import SimulacionesController from '../controllers/SimulacionesController.js';

export const router = Router()

router.post('/', SimulacionesController.funSimularFuncionNormal)
router.post('/brecha', SimulacionesController.funSimularFuncionBrecha)