import express from "express";
import userRoutes from "./user";
import inviteRoutes from "./invite";
import chatRoutes from "./chat";
import messageRoutes from "./message";

const apiRoutes = express.Router();

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/invite", inviteRoutes);
apiRoutes.use("/chat", chatRoutes);
apiRoutes.use("/message", messageRoutes);

const router = express.Router();
router.use("/api", apiRoutes);

export default router;
