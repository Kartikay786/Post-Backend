
import dotenv from 'dotenv'
import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors'
dotenv.config();
import postRouter from './router/post.router.js';
import commentRouter from './router/comment.router.js'
import userRouter from './router/user.router.js'
import dbconnection from './utils/db.js';
import cloudinary from './utils/cloudinary.js';

import { fileURLToPath } from 'url';
import path,{dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));


// db connnection
dbconnection();

// routes
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/user',userRouter);

const Port = process.env.PORT || 4000;
app.listen(Port,()=>{
    console.log('Server listening at port 3000');
})