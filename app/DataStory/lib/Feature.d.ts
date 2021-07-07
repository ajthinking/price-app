export declare class Feature {
    original: any;
    constructor(original?: any);
    get(property: string): any;
    set(...args: any[]): this;
    type(): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    unbox(): any;
}
