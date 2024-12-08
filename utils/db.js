import mongoose from "mongoose";

// db connnection

const dbconnection = ()=>{
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
}

export default dbconnection
