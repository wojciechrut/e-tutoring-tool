"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whiteboard_1 = __importDefault(require("../models/whiteboard"));
const create = async () => {
    const whiteboard = await whiteboard_1.default.create({});
    return whiteboard_1.default.findOne({ _id: whiteboard._id });
};
const addObject = async (_id, object) => {
    await whiteboard_1.default.updateOne({ _id }, {
        $push: { objects: object },
    });
};
const modifyObject = async (_id, object) => {
    if (!object.data || !object.data.id)
        return;
    await whiteboard_1.default.updateOne({ _id, "objects.data.id": object.data.id }, {
        $set: { "objects.$": object },
    });
};
const removeObjects = async (_id, objectIds) => {
    await whiteboard_1.default.updateOne({ _id }, {
        $pull: { objects: { "data.id": { $in: objectIds } } },
    });
};
const WhiteboardRepository = { create, addObject, modifyObject, removeObjects };
exports.default = WhiteboardRepository;
