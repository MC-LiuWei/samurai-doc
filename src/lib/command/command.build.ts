import { AbstractCommand } from './abstract.command';
import chalk from 'chalk';
import { CommanderStatic, Command } from 'commander';
import { Input } from './command.input';

export class BuildCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('build')
      .option('-c, --config [path]', 'build config')
      .description('build description')
      .action(async (command: Command) => {
        const options: Input[] = [];
        if (!command.config) {
          console.log(chalk.bgRedBright("输入配置文件路径"));
          process.exit(0);
        }
        options.push({ name: 'config', value: command.config });
        await this.action.handle(options);
      })
  }
}