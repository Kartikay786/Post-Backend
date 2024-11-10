import express from 'express'

import authenticate from '../utils/authorization.js';
import { createComment } from '../controller/comment.controller.js'

const router = express.Router();

router.post('/:id',authenticate,createComment);

export default router;