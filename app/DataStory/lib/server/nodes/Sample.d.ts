import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class Sample extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
}
