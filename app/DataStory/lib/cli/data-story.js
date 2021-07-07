"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ServerDiagram_1 = __importDefault(require("../server/ServerDiagram"));
const ServerNodeFactory_1 = __importDefault(require("../server/ServerNodeFactory"));
const type = process.argv[2];
const args = process.argv.slice(3);
const boot = () => {
    return JSON.stringify({
        stories: [],
        availableNodes: ServerNodeFactory_1.default.all().map(node => (new node()).serialize())
    });
};
const help = () => {
    return 'Please use syntax:\n\n    node data-story.js <ACTION> <DATA>\n\navailable actions [boot, help, run]';
};
const run = (serializedDiagram) => {
    return ServerDiagram_1.default.hydrate(serializedDiagram, ServerNodeFactory_1.default).run();
};
const handlers = { boot, help, run };
const handler = (_a = handlers[type]) !== null && _a !== void 0 ? _a : help;
console.info(handler(...args));
