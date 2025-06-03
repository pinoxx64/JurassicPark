import { Router } from "express";
import CeldaController from "../controllers/CeldaController.js";
import { validJWT } from "../middleware/validarJWT.js";

export const router = Router()

router.get('/',[validJWT], CeldaController.getAll)

router.put('/:id',[validJWT], CeldaController.funPutCelda)
router.get('/dinosDisponibles',[validJWT], CeldaController.funDinosDisponibles)