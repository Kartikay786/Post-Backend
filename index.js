
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import postRouter from './router/post.router.js';
import commentRouter from './router/comment.router.js'
import userRouter from './router/user.router.js'
import cors from 'cors'

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

// routes
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/user',userRouter)

// db connnection
const Uri = process.env.URL ;
mongoose.connect(Uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Db connected');
})
.catch((error)=>{
    console.log('Error at db connection :', error);
})


const Port = process.env.PORT || 4000;
app.listen(Port,()=>{
    console.log('Server listening at port 3000');
})