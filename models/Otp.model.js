import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    expiresAt : {
        type:Date,
        required:true
    }
},{timestamps:true})


const Otp = new mongoose.model('Otp',otpSchema);

export default Otp ;