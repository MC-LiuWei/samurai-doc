import { CommanderStatic, Command } from 'commander';
import chalk from 'chalk';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { prompt } from 'inquirer';

export class CreateCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name]')
      .alias('n')
      .description('create project')
      .option('-g, --skipGit', 'skip git init')
      .option('-i, --skipInit', 'skip npm init')
      .action(async (command: string, args: Command) => {
        const options: Input[] = [];
        if (!command || (typeof command !== 'string')) {
          console.log(chalk.bgRedBright("请输入文档项目名"));
          process.exit(1);
        }
        options.push({
          name: 'name',
          value: command
        })
        if (!args.skipGit) {
          const { repository } = await prompt([{
            type: 'input',
            name: 'repository',
            message: "请输入git仓库地址",
          }]);
          if (repository == '') {
            console.log(chalk.bgYellow("请输入git仓库地址"))
            process.exit(1);
          }
          (!!repository) && options.push({ name: "git", value: repository });
        }
        if (!args.skipInit) {
          options.push({ name: "install", value: !args.skipInit });
        }
        await this.action.handle(options);
      })
  }
}