import express from "express";
import MeetingController from "../controllers/meeting";
import MeetingValidator from "../middlewares/validators/meeting";
import auth from "../middlewares/auth";
import { Action, bodyValidator } from "../middlewares/validators/body";

const meetingRoutes = express.Router();

meetingRoutes.route("/").get(auth, MeetingController.getAll);
meetingRoutes.route("/mine").get(auth, MeetingController.getMine);
meetingRoutes.route("/access/:id").get(auth, MeetingController.get);
meetingRoutes
  .route("/")
  .post(
    auth,
    bodyValidator(Action.POST_MEETING),
    MeetingValidator.create,
    MeetingController.create
  );

export default meetingRoutes;
