import express from 'express';
import { signin, singup, google } from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup', singup);
router.post('/signin', signin);
router.post('/google', google);

export default router;
