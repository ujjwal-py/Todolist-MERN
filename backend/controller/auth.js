import User from '../model/User.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

// user already exists? 
// match jwt token

export const signInMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return res.status(400).json({msg: "Already signed in"})
    }
    next();
}

export const authMiddlware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            msg: "No token provided"
        })
    }
    try {
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const response = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({
            msg: "User not authenticated"
        })
    }
}

export const signIn = async(req, res) =>  {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username: username}).select("+password");
        if (!user) {
            return res.status(401).json({
                msg : "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({msg: "Invalid password"})
        }
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);
        res.status(200).json({
            token
        });
    }
    catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

export const signUpController = async(req, res) => {
    const username = req.body.username;
    
    try {
        const isExist = await User.findOne({username: username})
        if (isExist) {
            return res.status(409).json({
                msg: "User already exists"
            });
        }
        const password = req.body.password;
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPass
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

