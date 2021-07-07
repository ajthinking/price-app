"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerDiagram_1 = __importDefault(require("./ServerDiagram"));
class ServerDiagramFactory {
    static make() {
        return new ServerDiagram_1.default;
    }
}
exports.default = ServerDiagramFactory;
