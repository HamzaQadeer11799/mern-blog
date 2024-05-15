import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';
import { createComment } from '../controllers/comment.controller.js';
import { getComments } from '../controllers/comment.controller.js';
router.post('/create', verifyToken, createComment);
router.get('/getComments/:postId', getComments);

export default router;
