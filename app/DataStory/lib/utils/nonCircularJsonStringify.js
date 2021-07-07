"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonCircularJsonStringify = void 0;
const nonCircularJsonStringify = function (data, callback = null, indentation = 0) {
    var cache = [];
    return JSON.stringify(data, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, indentation);
};
exports.nonCircularJsonStringify = nonCircularJsonStringify;
