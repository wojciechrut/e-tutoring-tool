import express from "express";
import auth from "../middlewares/auth";
import { Action, bodyValidator } from "../middlewares/validators/body";
import Controller from "../controllers/leaflet";

const leafletRoutes = express.Router();

leafletRoutes
  .route("/")
  .post(auth, bodyValidator(Action.POST_LEAFLET), Controller.post);

leafletRoutes.route("/").get(Controller.search);

leafletRoutes.route("/categories").get(Controller.getCategories);

export default leafletRoutes;
