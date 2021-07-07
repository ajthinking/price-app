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
const ServerNode_1 = __importDefault(require("../ServerNode"));
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
const Feature_1 = require("../../Feature");
class OutputProvider extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'OutputProvider', summary: 'Provides output ports from JSON', category: 'Workflow', editableOutPorts: true }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let outputs = this.getParameterValue('outputs') ? this.getParameterValue('outputs') : {};
            // It can accept json string or object
            if (typeof outputs == 'string')
                outputs = JSON.parse(outputs);
            for (const [key, value] of Object.entries(outputs)) {
                this.output(value.map(v => new Feature_1.Feature(v)), key);
            }
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.js('outputs').withValue(''),
        ];
    }
}
exports.default = OutputProvider;
