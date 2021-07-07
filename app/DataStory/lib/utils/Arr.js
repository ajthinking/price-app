"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
const Obj_1 = require("./Obj");
const groupBy = (items, key) => {
    return items.reduce((result, item) => (Object.assign(Object.assign({}, result), { [Obj_1.get(item, key)]: [
            ...(result[Obj_1.get(item, key)] || []),
            item,
        ] })), {});
};
exports.groupBy = groupBy;
