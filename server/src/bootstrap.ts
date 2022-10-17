import {
  errorClearFiles,
  errorLogger,
  errorResponder,
  errorWrongEndpoint,
} from "./controllers/error";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";

dotenv.config();

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env["DB_URI"] as string);
    console.log(`DB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`DB connection failed:\n ${error.message}`);
    process.exit();
  }
};

const startServer = () => {
  const app = express();
  const port = process.env["SERVER_PORT"] || 5000;

  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.use(errorClearFiles);
  app.use(errorLogger);
  app.use(errorResponder);
  app.use(errorWrongEndpoint);

  app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
  });
};

const bootstrapApp = async () => {
  console.log("\n================ Bootstrapping app ================\n");

  await connectDatabase();
  startServer();
};

export default bootstrapApp;
