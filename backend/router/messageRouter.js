import express from 'express';
import { getAllMessages, sendMessage } from '../controller/messageController.js';
import { isAdminAuthentication } from '../middlewares/auth.js';

const router=express.Router();

router.post("/send",sendMessage);
router.get('/getall',isAdminAuthentication,getAllMessages);

export default router;