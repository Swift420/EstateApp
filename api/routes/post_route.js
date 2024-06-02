import express from 'express';

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    res.send('Hello World');
});

postRouter.post('/', (req, res) => {
    res.send('Hello World');
});

postRouter.put('/', (req, res) => {
    res.send('Hello World');
});

postRouter.delete('/', (req, res) => {
    res.send('Hello World');
});




export default postRouter;