import User from '../model/User.js';
import jwt from "jsonwebtoken";

// user already exists? 
// match jwt token


export const authMiddlware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "No token provided"
        })
    }
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(402).json({
            msg: "User not authenticated"
        })
    }
}

export const signUpController = async(req, res) => {
    const username = req.headers.username;
    
    try {
        const isExist = await User.findOne({username: username})
        if (isExist) {
            return res.status(402).json({
                msg: "User already exists"
            });
        }
        const password = req.headers.password;
        const newUser = await User.create({
            username,
            password
        })
        const token = jwt.sign({username: newUser.username}, process.env.JWT_SECRET);
        res.status(200).json({
            token
        });

    }
    catch (err) {
        res.status(500).json({
            msg : `${err.message}`
        })
    }
    

}

const createUser = async (req, res) => {
    try {
       const username = req.headers.username;
       const password = req.headers.password;
        const newUser = await User.create({
            username,  
            password
        })
        res.status(201).json({id: `${newUser._id}`})
    }
    catch (err) {
        console.error(err);
        res.status(401).json({message: `${err.message}`})
    }
}