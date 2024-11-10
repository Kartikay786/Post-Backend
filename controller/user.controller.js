// import User from "../models/user.model.js";
// import Otp from "../models/Otp.model.js";
// import { sendOtpEmail } from "../utils/nodemailer.js";
// import crypto from 'crypto'
// import jwt from 'jsonwebtoken'

// const genToken = (_id)=>{
//     const jwtkey = process.env.Secret_key;

//     return jwt.sign({_id},jwtkey,{expiresIn:'1h'});
// }

// const sendOtp = async (req,res)=>{
//     const {email} = req.body;

//     try{
//         const otp = crypto.randomInt(100000,999999).toString();

//         const expiresAt = new Date(Date.now() + 5 *60000);

//         await Otp.create({email,otp,expiresAt});

//         await sendOtpEmail(email,otp);

//         return res.status(200).json({message:'Otp sent successfully',otp});
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: 'Error sending OTP', error: err });
       
//     }
// }


// const register = async (req,res)=>{
//     const {email,name, password,otp} = req.body;

//     try{
//         const otpRecord = await Otp.findOne({email,otp});
//         if(!otpRecord || otpRecord.expiresAt < new Date()) return res.status(400).json({message:'No otp found or Invalid'});

//         await Otp.deleteOne({email,otp});

//         const user = new User({email,name,password,isVerified:true});

//         await user.save();

//         const token = genToken(user._id);

//         return res.status(201).json({ message: 'User registered successfully', user: user , token });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: 'Error during registration', error: err });
//     }
// }

// export {sendOtp,register}

import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from "validator";

const gentoken = (_id)=>{
    const jwtkey = process.env.Secret_key ;

    return jwt.sign({_id},jwtkey,{expiresIn:'1h'});
}

// register user 

const registerUser = async (req,res)=>{
   try{
    const{name,email,password} = req.body;

    let user = await userModel.findOne({email});
    if(user){
        console.log('User Already Registered');
       return res.json({message:'User Already registerd'});
    }

    if(!validator.isEmail(email)) return res.json({message:'Invalid Email'});

    
    // if(!validator.isStrongPassword(password)) return res.json({message:'Password must be strong'});

    user = new userModel({name,email,password});

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt );

    await user.save();

    const token = gentoken(user._id)

    res.status(200).json({token});
   }
   catch(err){
    res.status(500).json({message:'network issue'});
    console.log(err);
   }
}

// login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        // check email is valid 
   let user = await userModel.findOne({email});
   if(!user){
     return  res.status(400).json('Invalid email ');
   }

   // verify password
   const isMatch = bcrypt.compare(password,user.password)
   if(!isMatch){
     return  res.status(400).json('Invalid  password');
    
   }

   const token = gentoken(user._id);
   return res.status(200).json({message : 'login succesful',token,user});
   }
   catch(err){
       console.log(err);
       return res.status(500).json('Server error ');
   }
}

const findUser = async(req,res) =>{
    const userId =  req.params.userId ;
    try{
        const user =await userModel.findById(userId) ;

       return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).json('Server error ');
    }
}

const getUsers = async(req,res)=>{
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        return res.status(500).json('Server error ');
    }
}

 export {registerUser,loginUser,findUser,getUsers} ;