import {createPost,getPost,getPostnPagination,updatePost,deletePost} from '../controller/post.controller.js'
import express from 'express'
import authenticate from '../utils/authorization.js';

const router = express.Router();

router.post('/:userId',authenticate,createPost);  
router.get('/:id',getPost);
router.get('/',getPostnPagination);
router.put('/:id',authenticate,updatePost);
router.delete('/:id',authenticate,deletePost);

export default router