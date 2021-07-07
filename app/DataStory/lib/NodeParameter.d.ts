export default class NodeParameter {
    name: string;
    description: string;
    fieldType: string;
    placeholder?: string;
    value: any;
    options?: string[];
    constructor(name: string);
    static make(name: string): NodeParameter;
    static json(name: string): NodeParameter;
    static number(name: string): NodeParameter;
    static select(name: string): NodeParameter;
    static string(name: string): NodeParameter;
    static js(name: string): NodeParameter;
    static textarea(name: string): NodeParameter;
    withFieldType(type: string): this;
    withOptions(options: string[]): this;
    withPlaceholder(placeholder: string): this;
    withValue(value: any): this;
    withDescription(description: string): this;
}
