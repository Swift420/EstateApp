import express from 'express';
import { shouldbeAdmin, shouldbeLoggedIn } from '../controllers/test_controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const testRouter = express.Router();

testRouter.get('/should-be-logged-in',verifyToken,shouldbeLoggedIn);

testRouter.get('/should-be-admin', shouldbeAdmin);





export default testRouter;