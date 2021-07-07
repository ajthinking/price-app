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
Object.defineProperty(exports, "__esModule", { value: true });
class ServerDiagram {
    constructor() {
        this.links = [];
        this.nodes = [];
        this.cachedNodeDependencyMap = {
        // id1: [d1, d2, ...]
        };
    }
    static hydrate(data, factory) {
        let instance = new this();
        for (const [key, value] of Object.entries(data)) {
            if (key === 'layers') {
                instance.links = Object.values(data.layers[0].models);
                instance.nodes = Object.values(data.layers[1].models).map(node => {
                    return factory.hydrate(node, instance);
                });
                continue;
            }
            instance[key] = value;
        }
        return instance;
    }
    run() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var _b = __asyncValues(this.executionOrder()), _c; _c = yield _b.next(), !_c.done;) {
                    let node = _c.value;
                    yield node.run();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return new Promise((callback) => {
                return callback({
                    data: {
                        diagram: this
                    }
                });
            });
        });
    }
    find(id) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links);
        return searchables.find(entity => entity.id == id);
    }
    findByName(name) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links);
        return searchables.find(entity => entity.name == name);
    }
    addNode(node) {
        this.nodes.push(node);
        return this;
    }
    executionOrder() {
        this.clearCachedNodeDependencies();
        let r = this.nodes.sort((n1, n2) => {
            if (this.dependsOn(n2, n1)) {
                return -1;
            }
            if (this.dependsOn(n1, n2)) {
                return 1;
            }
            return 0;
        });
        return r;
    }
    getCachedNodeDependencies(id) {
        var _a;
        return (_a = this.cachedNodeDependencyMap[id]) !== null && _a !== void 0 ? _a : null;
    }
    setCachedNodeDependencies(id, dependencies) {
        this.cachedNodeDependencyMap[id] = dependencies;
    }
    clearCachedNodeDependencies() {
        this.cachedNodeDependencyMap = {};
    }
    dependencies(node) {
        let cached = this.getCachedNodeDependencies(node.id);
        if (cached !== null) {
            return cached;
        }
        let inPorts = Object.values(node.ports.filter(p => p.in == true));
        let linkLists = inPorts.map((port) => port.links);
        let links = linkLists.map(linkList => Object.values(linkList)).flat();
        let dependencies = links.map((link) => {
            let sourcePort = this.find(link).sourcePort;
            let sourceNode = this.find(sourcePort).parentNode;
            return this.find(sourceNode).id;
        });
        let deepDependencies = dependencies.map(d => {
            return this.dependencies(this.find(d));
        });
        let result = dependencies.concat(deepDependencies.flat());
        this.setCachedNodeDependencies(node.id, result);
        return result;
    }
    dependsOn(n1, n2) {
        return this.dependencies(n1).map(d => {
            return d.id;
        }).includes(n2.id);
    }
}
exports.default = ServerDiagram;
