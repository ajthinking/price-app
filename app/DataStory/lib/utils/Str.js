"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = void 0;
const trim = (s, c) => {
    if (c === "]")
        c = "\\]";
    if (c === "^")
        c = "\\^";
    if (c === "\\")
        c = "\\\\";
    return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
};
exports.trim = trim;
