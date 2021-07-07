import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class Sort extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    sortGlobal(): void;
    sortLocal(): void;
    getParameters(): NodeParameter[];
}
