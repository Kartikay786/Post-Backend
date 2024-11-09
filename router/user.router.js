import express from 'express'
import {sendOtp,register} from '../controller/user.controller.js'

const router = express.Router();

router.post('/sendotp',sendOtp);
router.post('/register',register);

export default router;