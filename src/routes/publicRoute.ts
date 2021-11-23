import { Router } from 'express'
import { singUp, singIn } from '../contollers/user'
const router = Router()


router.post('/singup', singUp)
router.post('/singin', singIn)

export default router