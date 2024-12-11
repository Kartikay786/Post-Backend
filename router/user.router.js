import express from 'express'
// import {sendOtp,register} from '../controller/user.controller.js'
import {registerUser,loginUser,findUser,userUpdate, pfpUpdate} from '../controller/user.controller.js'
import { upload } from '../utils/cloudinary.js';
import authenticate from '../middleware/authorization.js';
const router = express.Router();

// router.post('/sendotp',sendOtp);
// router.post('/register',register);

router.post('/register',upload.single('image'),registerUser);
router.post('/login',loginUser);
router.post('/:userId',findUser);
router.put('/update',authenticate,userUpdate);
router.put('/picupdate',authenticate,upload.single('image'),pfpUpdate);

export default router;