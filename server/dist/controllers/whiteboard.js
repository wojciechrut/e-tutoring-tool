"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whiteboard_1 = __importDefault(require("../repositories/whiteboard"));
const create_error_1 = require("../utils/helpers/create-error");
const _types_1 = require("../@types");
const addObject = async (request, response, next) => {
    const { id } = request.params;
    const { object } = request.body;
    try {
        await whiteboard_1.default.addObject(id, object);
    }
    catch (_a) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send("Object added");
};
const modifyObject = async (request, response, next) => {
    const { id } = request.params;
    const { object } = request.body;
    try {
        await whiteboard_1.default.modifyObject(id, object);
    }
    catch (_a) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send("Object added");
};
const removeObjects = async (request, response, next) => {
    const { id } = request.params;
    const { objectIds } = request.body;
    try {
        await whiteboard_1.default.removeObjects(id, objectIds);
    }
    catch (_a) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send("Object added");
};
exports.default = { addObject, modifyObject, removeObjects };
