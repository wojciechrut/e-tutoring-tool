import express from "express";
import Controller from "../controllers/file";
import auth from "../middlewares/auth";
import fileAccess from "../middlewares/file-access";

const fileRoutes = express();

fileRoutes.route("/").get(Controller.getAll);
fileRoutes.route("/mine").get(auth, Controller.getMine);
fileRoutes.route("/download").get(auth, fileAccess, Controller.download);

export default fileRoutes;
