import User from "../models/user.model.js";
import Otp from "../models/Otp.model.js";
import { sendOtpEmail } from "../utils/nodemailer.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const genToken = (_id)=>{
    const jwtkey = process.env.Secret_key;

    return jwt.sign({_id},jwtkey,{expiresIn:'1h'});
}

const sendOtp = async (req,res)=>{
    const {email} = req.body;

    try{
        const otp = crypto.randomInt(100000,999999).toString();

        const expiresAt = new Date(Date.now() + 5 *60000);

        await Otp.create({email,otp,expiresAt});

        await sendOtpEmail(email,otp);

        return res.status(200).json({message:'Otp sent successfully',otp});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error sending OTP', error: err });
       
    }
}


const register = async (req,res)=>{
    const {email,name, password,otp} = req.body;

    try{
        const otpRecord = await Otp.findOne({email,otp});
        if(!otpRecord || otpRecord.expiresAt < new Date()) return res.status(400).json({message:'No otp found or Invalid'});

        await Otp.deleteOne({email,otp});

        const user = new User({email,name,password,isVerified:true});

        await user.save();

        const token = genToken(user._id);

        return res.status(201).json({ message: 'User registered successfully', user: user , token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error during registration', error: err });
    }
}

export {sendOtp,register}