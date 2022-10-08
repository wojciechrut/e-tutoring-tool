import express from 'express';
import UserValidator from '../middlewares/validators/user';
import RegexValidator from '../middlewares/validators/regex';

const userRoutes = express.Router();

userRoutes.route('/').post(RegexValidator.validate, UserValidator.register);

export default userRoutes;
