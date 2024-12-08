import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from "validator";
import cloudinary from '../utils/cloudinary.js'
import fs from 'fs'

const gentoken = (_id,image,name) => {
    const jwtkey = process.env.Secret_key;
    return jwt.sign({ _id ,image,name}, jwtkey, { expiresIn: '1D' });
}

// register user 

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let imageUrl = req.file;

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path, {
                resource_type: 'image',
            })

            imageUrl = result.secure_url;

            fs.unlinkSync(req.file.path);
        }
       
        let user = await userModel.findOne({ email });
        if (user) {
            console.log('User Already Registered');
            return res.json({ message: 'User Already registerd' });
        }

        if (!validator.isEmail(email)) return res.json({ message: 'Invalid Email' });


        // if(!validator.isStrongPassword(password)) return res.json({message:'Password must be strong'});

        user = new userModel({ name, email, password,image:imageUrl });

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        console.log(user);
        const token = gentoken(user._id,user.image,user.name)

        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(err);
       return res.status(500).json({ message: 'network issue' });
        
    }
}

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check email is valid 
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json('Invalid email ');
        }

        // verify password
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json('Invalid  password');

        }

        const token = gentoken(user._id,user.image,user.name)
        return res.status(200).json({ message: 'login succesful', token, user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Server error ');
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);

        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Server error ');
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Server error ');
    }
}

export { registerUser, loginUser, findUser, getUsers };