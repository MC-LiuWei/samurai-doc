import { Paths, Modules, Info } from '../Context/interface';
export interface Task {
    callback: (message: string) => void;
    message: Paths;
    modules: Modules[];
    info: Info;
}
//# sourceMappingURL=interface.d.ts.map