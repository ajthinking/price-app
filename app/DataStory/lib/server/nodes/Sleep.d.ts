import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class Sleep extends ServerNode {
    constructor(options?: {});
    run(): Promise<unknown>;
    getParameters(): NodeParameter[];
}
