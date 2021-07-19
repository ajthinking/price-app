import ServerNode from "../ServerNode";
import Feature from "../../core/Feature";
export default class HTTPRequest extends ServerNode {
    client: any;
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): any[];
    protected getClient(): void;
    protected request(feature: Feature): any;
}
