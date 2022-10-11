"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const invite_1 = __importDefault(require("./invite"));
const apiRoutes = express_1.default.Router();
apiRoutes.use('/user', user_1.default);
apiRoutes.use('/invite', invite_1.default);
const router = express_1.default.Router();
router.use('/api', apiRoutes);
exports.default = router;
