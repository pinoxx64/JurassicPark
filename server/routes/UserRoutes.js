import UserController from '../controllers/UserController.js'

export const router = Router()

router.post('/login', UserController.funLogin)

router.get('/', UserController.funGetUsers)
router.get('/:id', UserController.funGetUser)
router.get('/email', UserController.funGetUserByEmail)
router.post('/', UserController.funPostUser)
router.put('/:id', UserController.funPutUser)
router.delete('/:id', UserController.funDeleteUser)
router.get('/activate/:id', UserController.funActivateUser)