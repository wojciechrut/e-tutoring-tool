import fileUpload from '../middlewares/file-upload';
import express from 'express';
import auth from '../middlewares/auth';
import chatAccess from '../middlewares/chat-access';

const messageRoutes = express.Router();

messageRoutes.route('/').post(fileUpload.message, auth, chatAccess);

export default messageRoutes;
