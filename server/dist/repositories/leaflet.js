"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafletSelector = void 0;
const leaflet_1 = __importDefault(require("../models/leaflet"));
const user_1 = require("./user");
const search_1 = require("../utils/helpers/search");
const leaflet_categories_1 = require("../utils/constants/leaflet-categories");
var LeafletSelector;
(function (LeafletSelector) {
    LeafletSelector["STANDARD"] = "-updatedAt";
})(LeafletSelector = exports.LeafletSelector || (exports.LeafletSelector = {}));
const populator = { path: "user", select: user_1.UserSelector.STANDARD };
const findOne = async (_id) => {
    return leaflet_1.default.findOne({
        _id,
    })
        .populate(populator)
        .select(LeafletSelector.STANDARD);
};
const findAll = async (query, page = 1) => {
    const { levels, subjects, title, lookingFor, user } = query;
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return leaflet_1.default.paginate(Object.assign({
        subjects: { $in: subjects || /.*/ },
        levels: { $in: levels || /.*/ },
        lookingFor: lookingFor || /.*/,
        parsedTitle: { $regex: new RegExp((0, search_1.parseForSearch)(title)) },
        createdAt: { $gte: monthAgo },
    }, user ? { user } : {}), {
        select: LeafletSelector.STANDARD,
        populate: populator,
        lean: true,
        limit: 10,
        sort: { createdAt: -1 },
        page,
    }).then(({ docs, hasNextPage, hasPrevPage, totalDocs, totalPages }) => ({
        leaflets: docs.map((_a) => {
            var { id } = _a, rest = __rest(_a, ["id"]);
            return rest;
        }),
        hasNextPage,
        hasPrevPage,
        totalDocs,
        totalPages,
        page,
    }));
};
const getCategories = () => {
    return leaflet_categories_1.leafletCategories;
};
const create = async (query) => {
    const result = await leaflet_1.default.create(Object.assign(Object.assign({}, query), { parsedTitle: (0, search_1.parseForSearch)(query.title) }));
    return findOne(result._id);
};
const deleteOne = async (id) => {
    return leaflet_1.default.deleteOne({ _id: id });
};
const updateOne = async (id, update) => {
    return leaflet_1.default.findOneAndUpdate({ _id: id }, update, { new: true });
};
const LeafletRepository = {
    findAll,
    findOne,
    create,
    getCategories,
    deleteOne,
    updateOne,
};
exports.default = LeafletRepository;
