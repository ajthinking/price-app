import ServerNode from "../ServerNode";
export default class Inspect extends ServerNode {
    features: any[];
    constructor(options?: {});
    run(): Promise<void>;
}
