import upload from "./../middlewares/file-upload";
import { UploadType } from "../utils/helpers/multer-upload";
import express from "express";
import auth from "../middlewares/auth";
import chatAccess from "../middlewares/chat-access";
import saveFiles from "../middlewares/file-save";

const messageRoutes = express.Router();

messageRoutes
  .route("/")
  .post(upload(UploadType.MESSAGE), auth, chatAccess, saveFiles);

export default messageRoutes;
