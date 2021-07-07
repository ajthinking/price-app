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
const Feature_1 = require("../../Feature");
const ServerNode_1 = __importDefault(require("../ServerNode"));
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
class Map extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Map', summary: 'Map into a property', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const property = this.getParameterValue('property');
            const paths = property.split('.');
            this.output(this.input().map(item => {
                let mapped = paths.reduce((carry, path) => {
                    return carry[path];
                }, item.original);
                return new Feature_1.Feature(mapped);
            }));
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.string('property').withValue('data'),
        ];
    }
}
exports.default = Map;
