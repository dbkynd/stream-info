import express from 'express';
import chatBotRoutes from './chat_bot_routes';

const router = express.Router();

router.use('/chat', chatBotRoutes);

export default router;
