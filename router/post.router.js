import {createPost,getPost,getPostnPagination,updatePost,deletePost} from '../controller/post.controller.js'
import express from 'express'

const router = express.Router();

router.post('/',createPost);  
router.get('/:postid',getPost);
router.get('/:id',getPostnPagination);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);

export default router