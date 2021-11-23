import { Router } from 'express'
import { singUp, singIn, UserIsValid } from '../contollers/user'
import passport from 'passport'
const router = Router()


router.post('/singup', singUp)
router.post('/singin', singIn)
router.get('/secure', passport.authenticate('jwt', {session:false}), UserIsValid )
export default router