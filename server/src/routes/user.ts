import express from 'express';
import UserValidator from '../middlewares/validators/user';
import UserController from '../controllers/user';
import { bodyValidator } from '../middlewares/validators/body';
import { Action } from '../middlewares/validators/body/actions';

const userRoutes = express.Router();

userRoutes.route('/').get(UserController.getAll);

userRoutes
  .route('/')
  .post(
    bodyValidator(Action.REGISTER_USER),
    UserValidator.register,
    UserController.register
  );

userRoutes
  .route('/login')
  .post(bodyValidator(Action.LOGIN_USER), UserController.login);

export default userRoutes;
