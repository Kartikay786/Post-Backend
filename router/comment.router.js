import express from 'express'

import authenticate from '../middleware/authorization.js';
import { createComment , getComment,likesupdate} from '../controller/comment.controller.js'

const router = express.Router();

router.post('/:id',authenticate,createComment);
router.get('/:id',getComment);
//likes

export default router;