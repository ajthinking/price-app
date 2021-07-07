import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class FilterDuplicates extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
    uniqueFeatures(all: any): any[];
}
