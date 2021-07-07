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
// @ts-ignore
const Str_1 = require("../../utils/Str");
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
class RegExpFilter extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'RegExpFilter', summary: 'Filter features matching an attribute regular expression', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Passed', 'Failed'] }, options));
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.string('attribute').withValue(''),
            NodeParameter_1.default.string('expression').withValue('/test|draft|dummy/'),
        ];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.output(this.matching(), 'Passed');
            this.output(this.notMatching(), 'Failed');
        });
    }
    matching() {
        return this.filterByRegExp(this.input());
    }
    notMatching() {
        return this.filterByRegExp(this.input(), true);
    }
    filterByRegExp(features, returnFailed = false) {
        return features.filter(feature => {
            let expression = this.getExpression();
            let attribute = this.getParameterValue('attribute');
            let comparable = attribute.split('.').reduce((traversed, part) => {
                return part ? traversed[part] : traversed;
            }, feature.original);
            return returnFailed
                ? !expression.test(comparable)
                : expression.test(comparable);
        });
    }
    getExpression() {
        let cleaned = Str_1.trim(this.getParameterValue('expression'), '/');
        return RegExp(cleaned);
    }
}
exports.default = RegExpFilter;
