"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStatus = void 0;
var ErrorStatus;
(function (ErrorStatus) {
    ErrorStatus[ErrorStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorStatus[ErrorStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorStatus[ErrorStatus["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    ErrorStatus[ErrorStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ErrorStatus[ErrorStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
})(ErrorStatus = exports.ErrorStatus || (exports.ErrorStatus = {}));
