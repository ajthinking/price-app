import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class OutputProvider extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
}
