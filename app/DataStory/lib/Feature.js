"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const Obj_1 = require("./utils/Obj");
class Feature {
    constructor(original = null) {
        this.original = original;
    }
    get(property) {
        return Obj_1.get(this.original, property);
    }
    set(...args) {
        if (args.length === 2) {
            this.original[args[0]] = args[1];
        }
        if (args.length === 1) {
            this.original = args[0];
        }
        return this;
    }
    type() {
        return typeof this.original;
    }
    unbox() {
        if (this.type() == 'object') {
            return this.original;
        }
        return this.original;
    }
}
exports.Feature = Feature;
