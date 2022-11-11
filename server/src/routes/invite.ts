import express from "express";
import auth from "../middlewares/auth";
import InviteController from "../controllers/invite";
import InviteValidator from "../middlewares/validators/invite";

const inviteRoutes = express.Router();

inviteRoutes.route("/").get(InviteController.getAll);
inviteRoutes.route("/").post(auth, InviteValidator.send, InviteController.send);
inviteRoutes.route("/mine").get(auth, InviteController.getMine);
inviteRoutes
  .route("/:inviteId")
  .post(auth, InviteValidator.setAccepted, InviteController.setAccepted);
inviteRoutes.route("/status").get(auth, InviteController.getInviteStatus);

export default inviteRoutes;
