import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', taskRoutes);
connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT ", process.env.PORT);
})
