"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionConstraints = exports.Action = void 0;
var Action;
(function (Action) {
    Action["REGISTER_USER"] = "register-user";
    Action["LOGIN_USER"] = "login-user";
    Action["SEND_INVITE"] = "send-invite";
})(Action = exports.Action || (exports.Action = {}));
exports.actionConstraints = {
    'register-user': {
        required: ['email', 'password', 'nickname'],
        regexValidated: ['email', 'password', 'nickname'],
    },
    'login-user': {
        required: ['email', 'password'],
        regexValidated: [],
    },
    'send-invite': {
        required: ['email'],
        regexValidated: [],
    },
};
