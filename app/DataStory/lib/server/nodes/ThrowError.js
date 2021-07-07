"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
const ServerNode_1 = __importDefault(require("../ServerNode"));
class ThrowError extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'ThrowError', summary: 'Throws an error', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: [] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.input().length)
                throw Error(this.getParameterValue('error_message'));
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.string('error_message').withValue('Something went wrong!'),
        ];
    }
}
exports.default = ThrowError;