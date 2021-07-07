import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class RegExpFilter extends ServerNode {
    constructor(options?: {});
    getParameters(): NodeParameter[];
    run(): Promise<void>;
    protected matching(): any;
    protected notMatching(): any;
    protected filterByRegExp(features: any, returnFailed?: boolean): any;
    protected getExpression(): RegExp;
}
