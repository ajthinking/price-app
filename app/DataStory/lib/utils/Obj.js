"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickBy = exports.get = void 0;
const get = (object, path = '') => {
    const steps = path ? path.split('.') : [];
    return steps.reduce((traversed, part) => {
        var _a;
        if (typeof traversed !== 'object' || traversed === null)
            return null;
        return (_a = traversed[part]) !== null && _a !== void 0 ? _a : null;
    }, object);
};
exports.get = get;
const pickBy = (object, picker) => {
    let result = {};
    for (const [key, value] of Object.entries(object)) {
        if (picker(value, key)) {
            result[key] = value;
        }
    }
    return result;
};
exports.pickBy = pickBy;
