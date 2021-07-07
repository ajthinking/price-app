import { BootPayload } from "../types/BootPayload";
export default class Server {
    boot(): Promise<BootPayload>;
    run(diagram: any): Promise<unknown>;
    save(name: string, model: any): Promise<unknown>;
    protected nodeDescriptions(): object[];
    hey(): string;
}
