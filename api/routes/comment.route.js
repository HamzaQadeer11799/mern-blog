import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment,
  editComment,
} from '../controllers/comment.controller.js';
import { getComments } from '../controllers/comment.controller.js';
import { likeComment } from '../controllers/comment.controller.js';
router.post('/create', verifyToken, createComment);
router.get('/getComments/:postId', getComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
export default router;
