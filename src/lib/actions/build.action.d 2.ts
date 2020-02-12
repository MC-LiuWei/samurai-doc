import { AbstractAction } from "./abstract.action";
import { Input } from "../command/command.input";
export interface ConfigInterface {
    name: string;
    url: string;
    version?: string;
    description?: string;
    title?: string;
}
export interface Configs {
    configs: ConfigInterface[];
    output: string;
}
export declare class BuildAction extends AbstractAction {
    handle(param: Input[]): Promise<void>;
}
//# sourceMappingURL=build.action.d.ts.map