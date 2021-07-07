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
class FilterDuplicates extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'FilterDuplicates', summary: 'Remove duplicates', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.output(this.uniqueFeatures(this.input()));
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.string('attribute').withDescription("attribute to filter on, may use dot notation")
        ];
    }
    uniqueFeatures(all) {
        const attribute = this.getParameterValue('attribute');
        var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];
        var uniqueFeatures = [];
        all.forEach(function (feature) {
            let comparable = attribute.split('.').reduce((traversed, part) => {
                return part ? traversed[part] : traversed;
            }, feature.original);
            var type = typeof comparable;
            if ((type in prims)) {
                if (!prims[type].hasOwnProperty(comparable)) {
                    uniqueFeatures.push(feature);
                    prims[type][comparable] = true;
                }
            }
            else {
                // // Strict does not work
                // if(objs.indexOf(comparable) == -1) {
                // 	uniqueFeatures.push(feature)
                // 	objs.push(comparable);
                // }
                // Cheat by comparing JSON
                comparable = JSON.stringify(comparable);
                if (objs.indexOf(comparable) == -1) {
                    uniqueFeatures.push(feature);
                    objs.push(comparable);
                }
            }
        });
        return uniqueFeatures;
    }
}
exports.default = FilterDuplicates;
