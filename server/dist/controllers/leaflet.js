"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const leaflet_1 = __importDefault(require("../repositories/leaflet"));
const create_error_1 = require("../utils/helpers/create-error");
const leaflet_categories_1 = require("../utils/constants/leaflet-categories");
const post = async (request, response, next) => {
    const { _id: user } = response.locals;
    const { title, description, levels, lookingFor, subjects } = request.body;
    const leaflet = await leaflet_1.default.create({
        title,
        description,
        levels,
        lookingFor,
        subjects,
        user,
    });
    if (!leaflet) {
        next((0, create_error_1.createError)(500, "Error occurred while creating leaflet."));
        return;
    }
    response.send("Leaflet posted successfully.");
};
const search = async (request, response, next) => {
    const { title, lookingFor, levels, subjects, user, page } = request.query;
    const searchResult = await leaflet_1.default.findAll({
        title,
        lookingFor: lookingFor && (0, leaflet_categories_1.getSymmetricLookingFor)(lookingFor),
        levels,
        subjects,
        user,
    }, page ? parseInt(page, 10) : 1);
    if (!searchResult) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send(searchResult);
};
const getCategories = async (_request, response) => {
    response.send(leaflet_1.default.getCategories());
};
const get = async (request, response, next) => {
    const { id } = request.params;
    const leaflet = await leaflet_1.default.findOne(id);
    if (!leaflet) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.NOT_FOUND, "Leaflet with this id does not exist"));
        return;
    }
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth());
    const expired = new Date(leaflet.createdAt) < monthAgo;
    const responseBody = leaflet;
    responseBody.expired = expired;
    response.send(responseBody);
};
const update = async (request, response, next) => {
    const { id, title, description } = request.body;
    const leaflet = await leaflet_1.default.updateOne(id, { title, description });
    if (!leaflet) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send(leaflet);
};
const deleteOne = async (request, response) => {
    const { id } = request.body;
    await leaflet_1.default.deleteOne(id);
    response.send();
};
exports.default = { post, search, getCategories, get, update, deleteOne };
