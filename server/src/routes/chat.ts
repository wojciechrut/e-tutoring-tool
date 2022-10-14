import express from 'express';
import auth from '../middlewares/auth';
import Controller from '../controllers/chat';
import Validator from '../middlewares/validators/chat';

const chatRoutes = express.Router();

chatRoutes.route('/').get(auth, Validator.get, Controller.get);

export default chatRoutes;
