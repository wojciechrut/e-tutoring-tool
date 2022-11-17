import express from "express";
import userRoutes from "./user";
import inviteRoutes from "./invite";
import chatRoutes from "./chat";
import messageRoutes from "./message";
import leafletRoutes from "./leaflet";
import fileRoutes from "./file";
import meetingRoutes from "./meeting";

const apiRoutes = express.Router();
apiRoutes.use("/user", userRoutes);
apiRoutes.use("/invite", inviteRoutes);
apiRoutes.use("/chat", chatRoutes);
apiRoutes.use("/message", messageRoutes);
apiRoutes.use("/leaflet", leafletRoutes);
apiRoutes.use("/file", fileRoutes);
apiRoutes.use("/meeting", meetingRoutes);

// for now - TODO
const staticRoutes = express.Router();
staticRoutes.use(express.static("static"));

const router = express.Router();
router.use("/api", apiRoutes);
router.use("/static", staticRoutes);

export default router;
