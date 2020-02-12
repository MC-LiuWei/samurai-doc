import { AbstractCommand } from './abstract.command';
import { CommanderStatic } from 'commander';
import { BuildCommand } from './command.build';
import { BuildAction } from '../actions/build.action';
import { CreateCommand } from './command.create';
import { CreateAction } from '../actions/create.action';


export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new BuildCommand(new BuildAction()).load(program);
    new CreateCommand(new CreateAction()).load(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      process.exit(1);
    })
  }
}