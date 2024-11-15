import express from 'express'
// import {sendOtp,register} from '../controller/user.controller.js'
import {registerUser,loginUser,findUser} from '../controller/user.controller.js'

const router = express.Router();

// router.post('/sendotp',sendOtp);
// router.post('/register',register);

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/:userId',findUser);

export default router;