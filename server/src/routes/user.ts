import express from 'express';
import Validator from '../middlewares/validators/user';

const userRoutes = express.Router();

userRoutes.route('/').post(Validator.register);

export default userRoutes;
