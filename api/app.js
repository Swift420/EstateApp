import express from 'express';
import postRouter from './routes/post_route.js';
import authRouter from './routes/auth_route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv";
import testRouter from './routes/test_route.js';
dotenv.config();
const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials:true}))
app.use(express.json());
app.use(cookieParser())
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});