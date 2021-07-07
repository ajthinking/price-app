/// <reference types="node" />
import ServerNode from "../ServerNode";
export default class Log extends ServerNode {
    logger: Console;
    constructor(options?: {});
    run(): Promise<void>;
}
