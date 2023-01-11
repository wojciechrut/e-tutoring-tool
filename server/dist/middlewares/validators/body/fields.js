"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyFieldEnum = exports.bodyFieldRegex = void 0;
const leaflet_categories_1 = require("../../../utils/constants/leaflet-categories");
exports.bodyFieldRegex = {
    nickname: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
        message: "Nickname should have 5-14 alphanumeric characters.",
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
        message: "Password too weak.",
    },
    email: {
        pattern: /^\S+@\S+\.\S+$/,
        message: "Invalid email address.",
    },
    title: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. '"{},]{3,40}$/,
        message: "Title can have 3-40 alphanumerical or some special characters",
    },
    description: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. \n\r'"{},]{20,500}$/,
        message: "Description can have 20-500 alphanumerical or some special characters",
    },
    text: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. \n\r'"{},]{1,200}$/,
        message: "Note can have 1-200 alphanumerical or some special characters.",
    },
};
exports.bodyFieldEnum = {
    lookingFor: leaflet_categories_1.leafletCategories.lookingFor,
    subjects: leaflet_categories_1.leafletCategories.subjects,
    levels: leaflet_categories_1.leafletCategories.levels,
};
