import {createPost,getPost,getallPost,updatePost,deletePost, likeadd} from '../controller/post.controller.js'
import express from 'express'
import authenticate from '../middleware/authorization.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post('/create', authenticate, upload.single('image'), createPost);  
router.get('/userpost',authenticate,getPost);
router.get('/',authenticate,getallPost);
router.put('/:id',authenticate,updatePost);
router.delete('/:id',authenticate,deletePost);
router.patch('/like/:id',authenticate,likeadd);


export default router