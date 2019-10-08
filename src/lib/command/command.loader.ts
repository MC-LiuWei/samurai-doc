import { AbstractCommand } from './abstract.command';
import { CommanderStatic } from 'commander';
import { BuildCommand } from './command.build';
import { BuildAction } from '../actions/build.action';


export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new BuildCommand(new BuildAction()).load(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      process.exit(1);
    })
  }
}