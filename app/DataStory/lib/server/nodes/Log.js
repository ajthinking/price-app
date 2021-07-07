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
class Log extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'Log', summary: 'log inputs to console', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: [] }, options));
        this.logger = console;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            // do like this to help when searching for console littering
            const method = 'log';
            this.logger.group('DataStory Log Node: ' + this.id);
            this.logger[method](this.input().map(f => f.original));
            console[method](JSON.stringify(this.input().map(f => f.original)));
            this.logger.groupEnd();
        });
    }
}
exports.default = Log;
