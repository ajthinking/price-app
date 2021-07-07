import { SerializedDiagramModel } from "../types/SerializedDiagramModel";
export default class ServerDiagram {
    links: any[];
    nodes: any[];
    cachedNodeDependencyMap: {
        [T: string]: string[];
    };
    static hydrate(data: SerializedDiagramModel, factory: any): ServerDiagram;
    run(): Promise<unknown>;
    find(id: string): any;
    findByName(name: string): any;
    addNode(node: any): this;
    executionOrder(): any[];
    getCachedNodeDependencies(id: any): string[];
    setCachedNodeDependencies(id: any, dependencies: any): void;
    clearCachedNodeDependencies(): void;
    dependencies(node: any): any;
    dependsOn(n1: any, n2: any): any;
}
