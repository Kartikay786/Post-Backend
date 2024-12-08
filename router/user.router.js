import express from 'express'
// import {sendOtp,register} from '../controller/user.controller.js'
import {registerUser,loginUser,findUser} from '../controller/user.controller.js'
import { upload } from '../middleware/multer.js';

const router = express.Router();

// router.post('/sendotp',sendOtp);
// router.post('/register',register);

router.post('/register',upload.single('image'),registerUser);
router.post('/login',loginUser);
router.post('/:userId',findUser);

export default router;