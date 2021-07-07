"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Aggregate_1 = __importDefault(require("./nodes/Aggregate"));
const Clone_1 = __importDefault(require("./nodes/Clone_"));
const Comment_1 = __importDefault(require("./nodes/Comment"));
const Create_1 = __importDefault(require("./nodes/Create"));
const CreateGrid_1 = __importDefault(require("./nodes/CreateGrid"));
const CreateAttribute_1 = __importDefault(require("./nodes/CreateAttribute"));
const CreateCSV_1 = __importDefault(require("./nodes/CreateCSV"));
const CreateJSON_1 = __importDefault(require("./nodes/CreateJSON"));
const CreateSequence_1 = __importDefault(require("./nodes/CreateSequence"));
// import DownloadCSV from './nodes/DownloadCSV'
// import DownloadJSON from './nodes/DownloadJSON'
// import DownloadGeoJSON from './nodes/DownloadGeoJSON'
const Evaluate_1 = __importDefault(require("./nodes/Evaluate"));
const FilterDuplicates_1 = __importDefault(require("./nodes/FilterDuplicates"));
const Flatten_1 = __importDefault(require("./nodes/Flatten"));
const Group_1 = __importDefault(require("./nodes/Group"));
// import HTTPRequest from './nodes/HTTPRequest'
const Inspect_1 = __importDefault(require("./nodes/Inspect"));
const Log_1 = __importDefault(require("./nodes/Log"));
const Map_1 = __importDefault(require("./nodes/Map"));
const OutputProvider_1 = __importDefault(require("./nodes/OutputProvider"));
const RegExpFilter_1 = __importDefault(require("./nodes/RegExpFilter"));
// import DeleteRepositories from './nodes/github/DeleteRepositories'
// import Repositories from './nodes/github/Repositories'
const Sample_1 = __importDefault(require("./nodes/Sample"));
const Sort_1 = __importDefault(require("./nodes/Sort"));
const Sleep_1 = __importDefault(require("./nodes/Sleep"));
const ThrowError_1 = __importDefault(require("./nodes/ThrowError"));
class ServerNodeFactory {
    static find(type) {
        return this.nodes[type];
    }
    static all() {
        return Object.values(this.nodes);
    }
    static make(type) {
        return new (this.find(type));
    }
    static hydrate(node, diagram = null) {
        const type = this.find(node.serverNodeType);
        return new type(Object.assign(Object.assign({}, node), { diagram }));
    }
}
exports.default = ServerNodeFactory;
ServerNodeFactory.nodes = {
    Aggregate: Aggregate_1.default,
    Clone_: Clone_1.default,
    Comment: Comment_1.default,
    Create: Create_1.default,
    CreateAttribute: CreateAttribute_1.default,
    CreateCSV: CreateCSV_1.default,
    CreateGrid: CreateGrid_1.default,
    CreateJSON: CreateJSON_1.default,
    CreateSequence: CreateSequence_1.default,
    // DeleteRepositories,
    // DownloadCSV,
    // DownloadJSON,
    // DownloadGeoJSON,
    Evaluate: Evaluate_1.default,
    FilterDuplicates: FilterDuplicates_1.default,
    Flatten: Flatten_1.default,
    Group: Group_1.default,
    // HTTPRequest,
    Inspect: Inspect_1.default,
    Log: Log_1.default,
    Map: Map_1.default,
    OutputProvider: OutputProvider_1.default,
    RegExpFilter: RegExpFilter_1.default,
    // Repositories,
    Sample: Sample_1.default,
    Sleep: Sleep_1.default,
    Sort: Sort_1.default,
    ThrowError: ThrowError_1.default,
};
