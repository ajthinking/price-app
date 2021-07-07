import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class Evaluate extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    runPerFeature(): void;
    runGlobal(): void;
    getExpression(): any;
    getParameters(): NodeParameter[];
}
