"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionConstraints = exports.Action = void 0;
var Action;
(function (Action) {
    Action["REGISTER_USER"] = "register-user";
    Action["LOGIN_USER"] = "login-user";
    Action["POST_LEAFLET"] = "post-leaflet";
    Action["POST_MEETING"] = "post-meeting";
    Action["POST_NOTE"] = "post-note";
    Action["UPDATE_LEAFLET"] = "update-leaflet";
})(Action = exports.Action || (exports.Action = {}));
exports.actionConstraints = {
    "register-user": {
        required: ["email", "password", "nickname"],
        regexValidated: ["email", "password", "nickname"],
        enumValidated: [],
    },
    "login-user": {
        required: ["email", "password"],
        regexValidated: [],
        enumValidated: [],
    },
    "post-leaflet": {
        required: ["title", "description", "levels", "subjects", "lookingFor"],
        regexValidated: ["title", "description"],
        enumValidated: ["lookingFor", "levels", "subjects"],
    },
    "post-meeting": {
        required: ["subjects", "invited", "startsAt"],
        enumValidated: ["subjects"],
        regexValidated: [],
    },
    "post-note": {
        required: ["text"],
        regexValidated: ["text"],
        enumValidated: [],
    },
    "update-leaflet": {
        required: ["title", "description"],
        regexValidated: ["title", "description"],
        enumValidated: [],
    },
};
