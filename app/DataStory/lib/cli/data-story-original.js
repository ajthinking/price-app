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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ServerDiagram_1 = __importDefault(require("../server/ServerDiagram"));
const ServerNodeFactory_1 = __importDefault(require("../server/ServerNodeFactory"));
const nonCircularJsonStringify_1 = require("../utils/nonCircularJsonStringify");
const type = process.argv[2];
const args = process.argv.slice(3);
const boot = () => {
    let result = JSON.stringify({
        stories: [],
        availableNodes: ServerNodeFactory_1.default.all().map(node => (new node()).serialize())
    });
    console.log(result);
};
const help = () => {
    console.log('Please use syntax:\n\n    node data-story.js <ACTION> <DATA>\n\navailable actions [boot, help, run]');
};
const run = (serializedDiagram) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield ServerDiagram_1.default.hydrate(JSON.parse(serializedDiagram), ServerNodeFactory_1.default).run();
    console.log(nonCircularJsonStringify_1.nonCircularJsonStringify(result.data));
});
const handlers = { boot, help, run };
const handler = (_a = handlers[type]) !== null && _a !== void 0 ? _a : help;
handler(...args);
