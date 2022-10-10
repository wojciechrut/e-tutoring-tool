import express from 'express';
import auth from '../middlewares/auth';
import { bodyValidator, Action } from '../middlewares/validators/body';

const inviteRoutes = express.Router();

inviteRoutes.route('/').post(auth, bodyValidator(Action.SEND_INVITE));

export default inviteRoutes;
