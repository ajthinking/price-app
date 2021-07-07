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
const Feature_1 = require("../../Feature");
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
class Create extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Create', summary: 'Create a null feature', category: 'Workflow', defaultInPorts: [], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const featurType = this.getParameterValue('feature_type');
            const contents = this.getParameterValue('contents');
            if (featurType == 'null') {
                this.output([new Feature_1.Feature()]);
            }
            if (featurType == 'object') {
                this.output([new Feature_1.Feature(JSON.parse(contents))]);
            }
            if (featurType == 'float') {
                this.output([new Feature_1.Feature(parseFloat(contents))]);
            }
            if (featurType == 'integer') {
                this.output([new Feature_1.Feature(parseInt(contents))]);
            }
            if (featurType == 'string') {
                this.output([new Feature_1.Feature(contents)]);
            }
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.select('feature_type').withOptions(['null', 'object', 'float', 'integer', 'string']).withValue('object'),
            NodeParameter_1.default.json('contents').withValue('{}'),
        ];
    }
}
exports.default = Create;
