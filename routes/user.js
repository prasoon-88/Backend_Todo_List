import express from 'express'
import {Login, Register, getMyProfile,logout} from '../conrollers/user.js' 

import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me',isAuth,getMyProfile)

router.post('/register',Register)

router.post('/login',Login)

router.post('/logout',logout)




export default router;