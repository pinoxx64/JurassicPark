import { Router } from "express";
import CeldaController from "../controllers/CeldaController.js";

export const router = Router()

router.get('/', CeldaController.getAll)

router.put('/:id', CeldaController.funPutCelda)
router.get('/dinosDisponibles', CeldaController.funDinosDisponibles)