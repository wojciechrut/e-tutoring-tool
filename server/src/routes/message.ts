import upload from "./../middlewares/file-upload";
import { UploadType } from "../utils/helpers/multer-upload";
import express from "express";
import auth from "../middlewares/auth";
import chatAccess from "../middlewares/chat-access";
import saveFiles from "../middlewares/file-save";
import Validator from "../middlewares/validators/message";
import Controller from "../controllers/message";

const messageRoutes = express.Router();

messageRoutes
  .route("/")
  .post(
    upload(UploadType.MESSAGE),
    auth,
    chatAccess,
    Validator.send,
    saveFiles,
    Controller.send
  );

export default messageRoutes;
