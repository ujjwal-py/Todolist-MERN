import mongoose from "mongoose";

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
}, {timestamps: true})

export default mongoose.model("User", userSchema);