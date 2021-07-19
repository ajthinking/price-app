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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerNode_1 = __importDefault(require("../ServerNode"));
const axios_1 = __importDefault(require("axios"));
const Feature_1 = require("../../Feature");
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
class HTTPRequest extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'HTTPRequest', summary: 'Make a HTTP request', category: 'Workflow', defaultInPorts: ['Input'], defaultOutPorts: ['Features', 'Response', 'Failed'] }, options));
        this.client = axios_1.default;
    }
    run() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var _b = __asyncValues(this.input()), _c; _c = yield _b.next(), !_c.done;) {
                    let feature = _c.value;
                    yield this.request(feature)
                        .then((result) => {
                        this.output([new Feature_1.Feature(result)], 'Response');
                        if (this.getParameterValue('features_path')) {
                            const features_path = this.getParameterValue('features_path');
                            const raw = features_path.split('.').reduce((traversed, part) => {
                                return part ? traversed[part] : traversed;
                            }, result);
                            const wrapped = [raw].flat();
                            this.output(wrapped.map(r => new Feature_1.Feature(r)), 'Features');
                        }
                    }).catch((reason) => {
                        if (reason) {
                            this.output(
                            // Prevent functions in data
                            [new Feature_1.Feature(JSON.parse(JSON.stringify(reason)))], 'Failed');
                        }
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            //NodeParameter.select('client').withOptions(['axios', 'mock']).withValue('axios'),
            NodeParameter_1.default.string('url').withValue('https://jsonplaceholder.cypress.io/{{ feature.resource }}'),
            NodeParameter_1.default.string('verb').withValue('GET'),
            NodeParameter_1.default.json('data').withValue('{}'),
            NodeParameter_1.default.json('config').withValue('{}'),
            NodeParameter_1.default.string('features_path').withValue('data').withDescription('optional dot.notated.path to feature(s)'),
        ];
    }
    getClient() {
        this.getParameterValue('client') == 'axios' ? axios_1.default : axios_1.default;
    }
    request(feature) {
        // console.info("Running HTTPRequest")
        if (this.getParameterValue('verb', feature) == 'GET') {
            return this.client.get(this.getParameterValue('url', feature), this.getParameterValue('config'));
        }
        if (this.getParameterValue('verb') == 'POST') {
            return this.client.post(this.getParameterValue('url', feature), this.getParameterValue('data'), this.getParameterValue('config'));
        }
        if (this.getParameterValue('verb') == 'DELETE') {
            return this.client.delete(this.getParameterValue('url', feature), JSON.parse(this.getParameterValue('config')));
        }
    }
}
exports.default = HTTPRequest;
