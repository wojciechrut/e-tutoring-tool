import express from 'express';
import chatAccess from '../middlewares/chat-access';

const messageRoutes = express.Router();

messageRoutes.route('/').post(chatAccess);

export default messageRoutes;
