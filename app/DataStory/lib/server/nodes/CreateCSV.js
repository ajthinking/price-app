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
class CreateCSV extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'CreateCSV', summary: 'Create features from CSV content', category: 'Workflow', defaultInPorts: [], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const delimiter = this.getParameterValue('delimiter');
            const content = this.getParameterValue('content');
            let rows = content.split('\n').map(row => row.split(delimiter));
            const headings = rows.shift();
            const objects = rows.map(row => {
                let object = {};
                for (const index in headings) {
                    const key = headings[index];
                    object[key] = this.parseValue(row[index]);
                }
                return object;
            });
            this.output(objects.map(o => new Feature_1.Feature(o)));
        });
    }
    serialize() {
        let description = super.serialize();
        description.parameters.push(NodeParameter_1.default.string('delimiter').withValue('	').withDescription('Default is TAB'), NodeParameter_1.default.textarea('content'));
        return description;
    }
    parseValue(value) {
        // Its just some string
        if (isNaN(value))
            return value;
        // Its numeric
        if (!Number.isNaN(parseFloat(value)))
            return parseFloat(value);
        if (!Number.isNaN(parseInt(value)))
            return parseInt(value);
        // Fallback
        return value;
    }
}
exports.default = CreateCSV;
