export declare type SerializedNodeModel = {
    id: string;
    type: string;
    x: number;
    y: number;
    ports: any[];
    category: string;
    editableInPorts: boolean;
    editableOutPorts: boolean;
    key?: string;
    name: string;
    nodeReact: string;
    parameters: {
        fieldType: string;
        value: string;
        name: string;
    }[];
    summary: string;
    serverNodeType: string;
    selected: any;
    extras: any;
    locked: any;
};
