import ServerNode from "../ServerNode";
import { Feature } from "../../Feature";
import NodeParameter from "../../NodeParameter";
export default class HTTPRequest extends ServerNode {
    client: import("axios").AxiosStatic;
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
    protected getClient(): void;
    protected request(feature: Feature): Promise<import("axios").AxiosResponse<any>>;
}
