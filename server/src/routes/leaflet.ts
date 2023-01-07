import express from "express";
import auth from "../middlewares/auth";
import { Action, bodyValidator } from "../middlewares/validators/body";
import Controller from "../controllers/leaflet";
import LeafletValidator from "../middlewares/validators/leaflet";

const leafletRoutes = express.Router();

leafletRoutes
  .route("/")
  .post(auth, bodyValidator(Action.POST_LEAFLET), Controller.post);

leafletRoutes
  .route("/")
  .delete(auth, LeafletValidator.leafletAccess, Controller.deleteOne);

leafletRoutes
  .route("/")
  .patch(
    auth,
    LeafletValidator.leafletAccess,
    bodyValidator(Action.UPDATE_LEAFLET),
    Controller.update
  );

leafletRoutes.route("/").get(Controller.search);
leafletRoutes.route("/details/:id").get(Controller.get);

leafletRoutes.route("/categories").get(Controller.getCategories);

export default leafletRoutes;
