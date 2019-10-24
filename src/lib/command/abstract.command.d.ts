import { AbstractAction } from '../actions/abstract.action';
import { CommanderStatic } from 'commander';
export declare abstract class AbstractCommand {
    protected action: AbstractAction;
    constructor(action: AbstractAction);
    abstract load(program: CommanderStatic): void;
}
//# sourceMappingURL=abstract.command.d.ts.map