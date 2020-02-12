import { Paths } from '../Content/paths';
import { Schemas } from '../Content/swagger';
export interface Task {
    callback: (message: string) => void;
    modules: Schemas[];
    message: Paths;
}
//# sourceMappingURL=interface.d.ts.map