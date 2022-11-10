import express from "express";
import Controller from "../controllers/file";

const fileRoutes = express();

fileRoutes.route("/").get(Controller.getAll);

export default fileRoutes;
