import express from "express";
import auth from "../middlewares/auth";
import Controller from "../controllers/whiteboard";

const whiteboardRoutes = express.Router();

whiteboardRoutes.route("/:id").put(auth, Controller.addObject);

export default whiteboardRoutes;
