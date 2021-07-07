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
const ServerDiagram_1 = __importDefault(require("./ServerDiagram"));
const ServerNodeFactory_1 = __importDefault(require("./ServerNodeFactory"));
class Server {
    boot() {
        return new Promise((callback) => {
            return callback({
                data: {
                    stories: [],
                    availableNodes: this.nodeDescriptions()
                }
            });
        });
    }
    run(diagram) {
        return __awaiter(this, void 0, void 0, function* () {
            return ServerDiagram_1.default.hydrate(diagram.serialize(), ServerNodeFactory_1.default).run();
        });
    }
    save(name, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((success) => {
                return success(true);
            });
        });
    }
    nodeDescriptions() {
        return ServerNodeFactory_1.default.all().map(node => (new node()).serialize());
    }
    hey() {
        return 'hiya!';
    }
}
exports.default = Server;
