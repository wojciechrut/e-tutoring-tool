import express from 'express';
import UserValidator from '../middlewares/validators/user';
import UserController from '../controllers/user';
import { bodyValidator } from '../middlewares/validators/body';
import { Action } from '../middlewares/validators/body/actions';

const userRoutes = express.Router();

userRoutes
  .route('/')
  .post(
    bodyValidator(Action.REGISTER_USER),
    UserValidator.register,
    UserController.register
  );

userRoutes.route('/').get(UserController.getAll);

export default userRoutes;
