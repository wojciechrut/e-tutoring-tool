"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMatch = exports.parseForSearch = void 0;
const parseForSearch = (phrase) => phrase ? phrase.replace(/ /g, "").toLowerCase() : "";
exports.parseForSearch = parseForSearch;
const searchMatch = (phrase, toMatch) => {
    (0, exports.parseForSearch)(toMatch).includes((0, exports.parseForSearch)(phrase));
};
exports.searchMatch = searchMatch;
