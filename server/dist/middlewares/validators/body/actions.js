"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionConstraints = exports.Action = void 0;
var Action;
(function (Action) {
    Action["REGISTER_USER"] = "register-user";
})(Action = exports.Action || (exports.Action = {}));
exports.actionConstraints = {
    'register-user': {
        required: ['email', 'password', 'nickname'],
        regexValidated: ['email', 'password', 'nickname'],
    },
};
