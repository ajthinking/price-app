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
class Sort extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Sort', summary: 'Sort features', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getParameterValue('sort_context') == 'global'
                ? this.sortGlobal()
                : this.sortLocal();
        });
    }
    sortGlobal() {
        const sortAttribute = this.getParameterValue('sort_attribute');
        this.output(this.input().sort((f1, f2) => {
            if (f1.get(sortAttribute) < f2.get(sortAttribute))
                return -1;
            if (f1.get(sortAttribute) === f2.get(sortAttribute))
                return 0;
            if (f1.get(sortAttribute) > f2.get(sortAttribute))
                return 1;
        }));
    }
    sortLocal() {
        const sortAttribute = this.getParameterValue('sort_attribute');
        this.output(this.input().map(feature => {
            return feature.get(sortAttribute).sort();
        }));
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.select('sort_context').withOptions(["global" /*, "local"*/]).withValue('global'),
            NodeParameter_1.default.string('sort_attribute').withDescription("attribute to sort on, may use dot notation"),
        ];
    }
}
exports.default = Sort;
