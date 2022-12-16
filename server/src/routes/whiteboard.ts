import express from "express";
import auth from "../middlewares/auth";
import Controller from "../controllers/whiteboard";

const whiteboardRoutes = express.Router();

whiteboardRoutes.route("/:id").put(auth, Controller.addObject);
whiteboardRoutes.route("/:id").patch(auth, Controller.modifyObject);
whiteboardRoutes
  .route("/removeObjects/:id/")
  .patch(auth, Controller.removeObjects);

export default whiteboardRoutes;
