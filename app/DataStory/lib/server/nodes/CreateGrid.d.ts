import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class CreateGrid extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
}
