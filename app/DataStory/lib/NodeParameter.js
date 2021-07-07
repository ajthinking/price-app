"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeParameter {
    constructor(name) {
        this.description = '';
        this.fieldType = "String_";
        this.value = '';
        this.name = name;
    }
    static make(name) {
        return new this(name);
    }
    static json(name) {
        return this.make(name).withFieldType('JSON_');
    }
    static number(name) {
        return this.make(name).withFieldType('Number');
    }
    static select(name) {
        return this.make(name).withFieldType('Select');
    }
    static string(name) {
        return this.make(name).withFieldType('String_');
    }
    static js(name) {
        return this.make(name).withFieldType('JS');
    }
    static textarea(name) {
        return this.make(name).withFieldType('Textarea');
    }
    withFieldType(type) {
        this.fieldType = type;
        return this;
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    withPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    withValue(value) {
        this.value = value;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
}
exports.default = NodeParameter;
