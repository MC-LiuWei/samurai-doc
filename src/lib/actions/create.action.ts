import { AbstractAction } from "./abstract.action";
import { Input } from "../command/command.input";
import { mkdirSync, fstat, existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { copy } from "../../utils/copy";
import { exec } from "child_process";


export class CreateAction extends AbstractAction {
  public async handle(params: Input[]) {
    const projectName = params.find((item) => item.name === "name")!.value;
    const projectPath = join(process.cwd(), String(projectName));
    const git = params.find((item) => item.name === 'git');
    const install = params.find((item) => item.name === 'install');
    if (existsSync(projectPath)) {
      console.log(chalk.bgRedBright("目录已存在"));
      process.exit(0);
    }
    console.log(chalk.bgGreen("创建文档文件夹"));
    mkdirSync(projectPath);
    console.log(chalk.bgGreen("拷贝模版文件"));
    copy(join(__dirname, '..', '..', 'example'), projectPath);
    if (git && git.value) {
      process.chdir(projectPath);
      console.log(chalk.bgGreen("初始化git仓库"));
      exec(`git init`);
      exec(`git remote add origin ${git.value}`);
      console.log(chalk.bgGreen("结束"));
      process.exit(0)
    }
  }
}