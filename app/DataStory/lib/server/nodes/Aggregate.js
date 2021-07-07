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
const Arr_1 = require("../../utils/Arr");
const Feature_1 = require("../../Feature");
class Aggregate extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Aggregate', summary: 'Group features by attribute', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupKey = this.getParameterValue('group_by');
            const key = [
                'original',
                ...(groupKey ? [groupKey] : [])
            ].join('.');
            const groups = Arr_1.groupBy(this.input(), key);
            const features = [];
            for (const value in groups) {
                features.push(new Feature_1.Feature({
                    [groupKey]: value,
                    features: groups[value].map(feature => feature.original)
                }));
            }
            this.output(features);
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.string('group_by'),
        ];
    }
}
exports.default = Aggregate;
