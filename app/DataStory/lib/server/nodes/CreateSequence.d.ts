import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class CreateSequence extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
}
