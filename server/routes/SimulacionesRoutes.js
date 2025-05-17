import { Router } from 'express';
import SimulacionesController from '../controllers/SimulacionesController.js';

export const router = Router()

router.get('/', SimulacionesController.funSimularFuncionNormal)