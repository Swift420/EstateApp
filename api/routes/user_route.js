import express from 'express';

import {getUsers, getUser, updateUser, deleteUser} from '../controllers/user_controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const userRouter = express.Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',verifyToken,getUser);
userRouter.put('/:id',verifyToken, updateUser);
userRouter.delete('/:id',verifyToken, deleteUser);





export default userRouter;