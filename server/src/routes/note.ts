import express from "express";
import auth from "../middlewares/auth";
import Controller from "../controllers/note";
import { UploadType } from "../utils/helpers/multer-upload";
import upload from "../middlewares/file-upload";
import saveFiles from "../middlewares/file-save";
import { Action, bodyValidator } from "../middlewares/validators/body";

const noteRoutes = express.Router();

noteRoutes
  .route("/")
  .post(
    auth,
    upload(UploadType.NOTE),
    saveFiles,
    bodyValidator(Action.POST_NOTE),
    Controller.create
  );
noteRoutes.route("/").get(auth, Controller.getMine);

export default noteRoutes;
