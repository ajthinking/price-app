import ServerDiagram from "./ServerDiagram";
import { Feature } from "../Feature";
import NodeParameter from "../NodeParameter";
declare type ServerNodeOptions = {
    diagram?: ServerDiagram;
    parameters?: object[];
    defaultInPorts?: string[];
    defaultOutPorts?: string[];
    editableInPorts?: boolean;
    editableOutPorts?: boolean;
    name?: string;
    summary?: string;
    category?: string;
    id?: string;
};
export default abstract class ServerNode {
    id: string;
    ports: any[];
    diagram: ServerDiagram;
    category: string;
    editableInPorts: boolean;
    editableOutPorts: boolean;
    key: string;
    name: string;
    serverNodeType: string;
    nodeReact: string;
    parameters: any[];
    summary: string;
    defaultInPorts: string[];
    defaultOutPorts: string[];
    abstract run(): any;
    constructor(options?: ServerNodeOptions);
    createPorts(options: any): any;
    getDefaultInPorts(): {
        name: string;
        in: boolean;
    }[];
    getDefaultOutPorts(): {
        name: string;
        in: boolean;
    }[];
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
    getParameters(): NodeParameter[];
    protected getParameter(name: string): any;
    protected getParameterValue(name: string, feature?: Feature): any;
    protected interpretParameterValue(parametric: any, feature: any): any;
    protected input(portName?: string): any;
    protected getDataAtPortNamed(name?: string): any;
    protected output(features: any[], port?: string): void;
    protected portNamed(name: string): any;
}
export {};
