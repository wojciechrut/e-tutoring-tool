import express from "express";
import UserValidator from "../middlewares/validators/user";
import UserController from "../controllers/user";
import { Action, bodyValidator } from "../middlewares/validators/body";
import auth from "../middlewares/auth";
import fileUpload from "../middlewares/file-upload";
import { UploadType } from "../utils/helpers/multer-upload";
import saveFiles from "../middlewares/file-save";

const userRoutes = express.Router();

userRoutes.route("/").get(UserController.getAll);
userRoutes.route("/me").get(auth, UserController.me);

userRoutes
  .route("/")
  .post(
    fileUpload(UploadType.AVATAR),
    bodyValidator(Action.REGISTER_USER),
    UserValidator.register,
    UserController.register,
    saveFiles
  );

userRoutes.route("/friends").patch(auth, UserController.disfriend);

userRoutes
  .route("/login")
  .post(bodyValidator(Action.LOGIN_USER), UserController.login);

export default userRoutes;
