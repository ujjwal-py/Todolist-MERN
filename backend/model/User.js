import mongoose from "mongoose";
import zod from 'zod'
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        require : [true, 'Username is required'],
        unique: [true, "Username must be unique"]
    }, 
    password : {
        type: String, 
        require: true,
        select: false, 
        minlength: [8, "Password must contains atleast 8 characters"]
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }

    
}, {timestamps: true})

export default mongoose.model("User", userSchema);