import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

console.log(process.env.FRONTEND_URL);
const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}));
app.use(cookieParser())

app.use('/', taskRoutes);
connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT ", process.env.PORT);
})
