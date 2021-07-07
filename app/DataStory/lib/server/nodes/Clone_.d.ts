import NodeParameter from "../../NodeParameter";
import ServerNode from "../ServerNode";
export default class Clone_ extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    getParameters(): NodeParameter[];
}
