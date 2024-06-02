import express from 'express';
import postRouter from './routes/post_route.js';
import authRouter from './routes/auth_route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});