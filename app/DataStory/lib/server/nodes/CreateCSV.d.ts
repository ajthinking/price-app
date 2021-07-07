import ServerNode from "../ServerNode";
import NodeParameter from "../../NodeParameter";
export default class CreateCSV extends ServerNode {
    constructor(options?: {});
    run(): Promise<void>;
    serialize(): {
        category: string;
        editableInPorts: boolean;
        editableOutPorts: boolean;
        ports: any[];
        key: string;
        name: string;
        nodeReact: string;
        serverNodeType: string;
        parameters: NodeParameter[];
        summary: string;
    };
    protected parseValue(value: string): string | number;
}
