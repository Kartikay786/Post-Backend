import express from 'express'

import authenticate from '../utils/authorization.js';
import { createComment , getComment} from '../controller/comment.controller.js'

const router = express.Router();

router.post('/:id/:userid',authenticate,createComment);
router.get('/:id',getComment);

export default router;