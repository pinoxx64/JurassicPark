import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.post('/login', UserController.funLogin)

router.get('/',[validJWT] ,UserController.funGetUsers)
router.get('/:id',[validJWT], UserController.funGetUser)
router.get('/buscar/email',[validJWT], UserController.funGetUserByEmail)
router.post('/',[validJWT], UserController.funPostUser)
router.put('/:id',[validJWT], UserController.funPutUser)
router.delete('/:id',[validJWT], UserController.funDeleteUser)
router.get('/activate/:id',[validJWT], UserController.funActivateUser)