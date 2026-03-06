import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected")
    }
    catch (err) {
        console.error("An error Occured During connecting the database", err)
        process.exit(1)
    }
}
export default connectDB;