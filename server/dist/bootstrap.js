"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./controllers/error");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const socket_1 = require("./socket");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const connectDatabase = async () => {
    try {
        const connection = await mongoose_1.default.connect(process.env["DB_URI"]);
        console.log(`DB connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.log(`DB connection failed:\n ${error.message}`);
        process.exit();
    }
};
const startServer = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    const port = process.env["SERVER_PORT"] || 5000;
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(routes_1.default);
    app.use(error_1.errorClearFiles);
    app.use(error_1.errorLogger);
    app.use(error_1.errorResponder);
    app.use(error_1.errorWrongEndpoint);
    server.listen(port, () => {
        console.log(`Server started on PORT: ${port}`);
    });
    return server;
};
const bootstrapApp = async () => {
    console.log("\n================ Bootstrapping app ================\n");
    await connectDatabase();
    const server = startServer();
    (0, socket_1.setupSocket)(server);
};
exports.default = bootstrapApp;
