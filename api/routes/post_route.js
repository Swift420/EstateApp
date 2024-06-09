import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js'
import { addPosts, deletePost, getPost, getPosts, updatePost } from '../controllers/post_controller.js';
const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);

postRouter.post('/',verifyToken, addPosts);

postRouter.put('/', verifyToken, updatePost);

postRouter.delete('/:id', verifyToken, deletePost);




export default postRouter;