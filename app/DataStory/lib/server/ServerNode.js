"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const UID_1 = __importDefault(require("../utils/UID"));
const NodeParameter_1 = __importDefault(require("../NodeParameter"));
class ServerNode {
    constructor(options = {}) {
        var _a, _b, _c, _d, _e;
        this.category = 'Custom';
        this.editableInPorts = false;
        this.editableOutPorts = false;
        this.key = 'test-key';
        this.nodeReact = 'Node';
        this.summary = 'No summary provided.';
        this.diagram = options.diagram;
        this.id = (_a = options.id) !== null && _a !== void 0 ? _a : UID_1.default();
        this.name = options.name,
            this.summary = options.summary,
            this.category = options.category,
            this.defaultInPorts = (_b = options.defaultInPorts) !== null && _b !== void 0 ? _b : ['Input'],
            this.defaultOutPorts = (_c = options.defaultOutPorts) !== null && _c !== void 0 ? _c : ['Output'],
            this.editableInPorts = (_d = options.editableInPorts) !== null && _d !== void 0 ? _d : false;
        this.editableOutPorts = (_e = options.editableOutPorts) !== null && _e !== void 0 ? _e : false;
        this.parameters = options.parameters ? options.parameters : [];
        this.ports = this.createPorts(options);
    }
    createPorts(options) {
        var _a;
        return (_a = options.ports) !== null && _a !== void 0 ? _a : [
            ...this.getDefaultInPorts(),
            ...this.getDefaultOutPorts(),
        ];
    }
    getDefaultInPorts() {
        return (this.defaultInPorts).map(name => {
            return {
                name,
                in: true
            };
        });
    }
    getDefaultOutPorts() {
        return this.defaultOutPorts.map(name => {
            return {
                name,
                in: false
            };
        });
    }
    serialize() {
        return {
            category: this.category,
            editableInPorts: this.editableInPorts,
            editableOutPorts: this.editableOutPorts,
            ports: this.ports,
            key: this.key,
            name: this.name,
            nodeReact: this.nodeReact,
            serverNodeType: this.name,
            parameters: this.getParameters(),
            summary: this.summary,
        };
    }
    getParameters() {
        return [
            NodeParameter_1.default.string('node_name').withValue(this.name)
        ];
    }
    getParameter(name) {
        return this.parameters.find(p => p.name == name);
    }
    getParameterValue(name, feature = null) {
        let value = this.getParameter(name).value;
        if (!feature)
            return value;
        return this.interpretParameterValue(value, feature);
    }
    interpretParameterValue(parametric, feature) {
        let matches = parametric.match(/\{\{[\.a-zA-Z\s_]*\}\}/g);
        if (matches) {
            for (let match of matches) {
                let originalMatch = match;
                let parts = match.replace('{{', '')
                    .replace('}}', '')
                    .trim()
                    .split('.');
                parts.shift(); // Remove 'feature'
                let interpreted = parts.reduce((carry, property) => {
                    return carry[property];
                }, feature.original);
                parametric = parametric.replace(originalMatch, interpreted);
            }
        }
        return parametric;
    }
    input(portName = 'Input') {
        return this.getDataAtPortNamed(portName);
    }
    getDataAtPortNamed(name = 'Input') {
        let port = this.portNamed(name);
        let features = port.links.map(linkId => {
            var _a;
            let link = this.diagram.find(linkId);
            let source = this.diagram.find(link.sourcePort);
            return (_a = source.features) !== null && _a !== void 0 ? _a : [];
        }).flat();
        return _.cloneDeep(features);
    }
    output(features, port = 'Output') {
        this.portNamed(port).features = this.portNamed(port).features ? this.portNamed(port).features.concat(features) : features;
    }
    portNamed(name) {
        return this.ports.find(port => port.name == name);
    }
}
exports.default = ServerNode;
