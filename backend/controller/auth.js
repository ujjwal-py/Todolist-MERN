import User from '../model/User.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import zod from 'zod';


const userSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().trim().min(8)
})

const verfiyToken =  (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        throw new Error ("no token provided");
    };
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
}  





export const check_user = (req, res) => {
    try {
        verfiyToken(req, res)
        return res.status(200).json({msg: "user valid"})
    }
    catch (err) {
        res.status(400).json({msg: err.message})
    }

}

export const preventRelogin = (req, res, next) => {
    try {
        verfiyToken(req, res);
        return res.status(200).json({msg: "user already signed in"});
    }
    catch {
        // means no valid token, allow them to sign in
        next();
    }
}

export const authMiddlware = (req, res, next) => {
    try {
        verfiyToken(req, res);
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
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // Only true in production
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            maxAge: 24*60 * 60 * 1000
        });
        res.status(200).json({
            msg: "signed in successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

export const signUpController = async(req, res) => {
    const {username} = req.body;
    
    try {
        const isExist = await User.findOne({username: username})
        if (isExist) {
            return res.status(409).json({
                msg: "User already exists"
            });
        }
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: `${result.error.issues[0].path[0]} ${result.error.issues[0].message}`
            });
        }
        const data = result.data;
        const hashedPass = await bcrypt.hash(data.password, 10);
        data.password = hashedPass;
        
        const user = new User(data);
        await user.save();

        const token = jwt.sign({username: user.username, user_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        // save token as cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // Only true in production
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            maxAge: 24 * 60* 60 * 1000
        });

        res.status(200).json({
            msg: "Signed up"
        });

    }
    catch (err) {
        res.status(500).json({
            msg : `${err.message}`
        })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({msg: "successfully logged out"})
    }
    catch (err) {
        res.status(500).json({msg: err})
    }
}

