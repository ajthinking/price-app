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
const placeholder = `// PER FEATURE mode gives you access to variables: previous, current and next, ie
// previous.get('some_property')
// current.set('some_property', 123)

// GLOBAL mode gives full control
// use this.input() and this.output()
`;
class Evaluate extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Evaluate', summary: 'Evaluate javascript', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getParameterValue('evaluation_context') == 'per_feature'
                ? this.runPerFeature()
                : this.runGlobal();
        });
    }
    runPerFeature() {
        let inputs = this.input(); // maintain state - no additional feature clones
        this.output(inputs.map((current, index) => {
            var _a, _b;
            // previous and next have 'null' features as fallback
            const previous = (_a = inputs[index - 1]) !== null && _a !== void 0 ? _a : new Feature_1.Feature();
            const next = (_b = inputs[index + 1]) !== null && _b !== void 0 ? _b : new Feature_1.Feature();
            eval(this.getExpression());
            return current;
        }));
    }
    runGlobal() {
        eval(this.getExpression());
    }
    getExpression() {
        return this.getParameterValue('expression');
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.select('evaluation_context')
                .withOptions(['per_feature', 'global'])
                .withValue('per_feature'),
            NodeParameter_1.default.js('expression')
                .withDescription("javascript code to execute")
                .withValue(placeholder)
        ];
    }
}
exports.default = Evaluate;
