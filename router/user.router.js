import express from 'express'
// import {sendOtp,register} from '../controller/user.controller.js'
import {registerUser,loginUser} from '../controller/user.controller.js'

const router = express.Router();

// router.post('/sendotp',sendOtp);
// router.post('/register',register);

router.post('/register',registerUser);
router.post('/login',loginUser)

export default router;