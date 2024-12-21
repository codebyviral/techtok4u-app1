import express from 'express';
import dotenv from "dotenv"
import { connectToDatabase } from './config/db.js';
import cors from 'cors';
import userRouter from "./routes/user-router.js"
import getRouter from "./routes/get-router.js"
import bodyParser from 'body-parser';

const app = express();


dotenv.config();

const corsOptions = {
    origin: '',
    method: 'GET, POST, DELETE, PATCH, HEAD',
    Credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.send("Hello World");
})

const port = process.env.PORT || 8000;

app.use("/api/add", userRouter)
app.use("/api/get", getRouter)

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
