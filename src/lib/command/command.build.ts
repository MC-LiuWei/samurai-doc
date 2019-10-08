import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command } from 'commander';
import { Input } from './command.input';

export class BuildCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('build [options]')
      .option('-c, --config [path]', 'build config')
      .description('build description')
      .action(async (command: Command) => {
        const options: Input[] = [];
        if (!command.config) {
          return;
        }
        options.push({ name: 'config', value: command.config });
        await this.action.handle(options);
      })
  }
}