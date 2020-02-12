import * as path from 'path';
import * as fs from 'fs';
import spin from 'io-spin';
import chalk from 'chalk';
import { execSync } from 'child_process';
import axios from 'axios';
import { AbstractAction } from "./abstract.action";
import { Input } from "../command/command.input";
import Context from '../../core/Content';
import { getFilenameSuffix } from '../../utils/getFilenameSuffix';
import { generateDoc } from '../../core/document';
import { del } from '../../utils/del';
const spinner = spin('  >>>>>>  加载中', "Box1");
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

export class BuildAction extends AbstractAction {
  public async handle(param: Input[]) {
    const configPath = param.find((item) => item.name === 'config')!.value;
    const strConfigPath = String(configPath);
    if (!configPath || !getFilenameSuffix(strConfigPath)) {
      process.exit(1);
    }
    const _configPath = path.join(process.cwd(), strConfigPath);
    const config: Configs = JSON.parse(fs.readFileSync(_configPath, { encoding: 'utf-8' }));
    await Generate(config);
  }
}

async function Generate(config: Configs) {
  spinner.update(chalk.cyanBright('  >>>>  文档加载中'));
  spinner.start();
  const docConfigs: ConfigInterface[] = config.configs;
  const outputPath: string = path.join(process.cwd(), config.output);
  const apiDocPath: string = path.join(process.cwd(), 'apidoc');

  let docTaskQueue: Promise<{ name: string; doc: any }>[] = [];

  if (fs.existsSync(outputPath)) {
    del(outputPath);
    fs.mkdirSync(outputPath);
  }
  if (fs.existsSync(apiDocPath)) {
    del(apiDocPath);
    fs.mkdirSync(apiDocPath);
  }

  docTaskQueue = docConfigs.map<Promise<{ name: string; doc: any }>>((item) => {
    return new Promise<{ name: string; doc: any }>(async (res, rej) => {
      console.log(chalk.cyanBright(`  >>>>  开始加载${item.name}`));
      const doc = await getDoc(item.url);
      if (!doc) {
        console.log(chalk.redBright(`  >>>>  ${item.name}文档加载失败`));
      }
      res({
        name: item.name,
        doc,
      })
    })
  });

  Promise.all<{ name: string; doc: any }>(docTaskQueue)
    .then((res) => {
      const docqueue = res.filter((item) => !!item.doc);
      if (docqueue.length <= 0) {
        spinner.stop();
        spinner.update(chalk.redBright(`  >>>>  文档加载失败,待处理文档列表为空`));
        process.exit(0);
      }
      docqueue.forEach(async (_doc, index) => {
        const { doc, name } = _doc
        const docOutputPath = path.join(outputPath, name);
        const docApiDocPath = path.join(apiDocPath, name);
        if (!fs.existsSync(path.join(docOutputPath))) {
          fs.mkdirSync(docOutputPath);
        }
        if (!fs.existsSync(path.join(docApiDocPath))) {
          fs.mkdirSync(docApiDocPath);
        }
        const paths = new Context(doc);
        const modules = paths.getModule();
        const docCode = await generateDoc(paths.getPath(), modules);
        fs.writeFileSync(path.join(docOutputPath, 'apidoc.js'), docCode.join(''), { encoding: 'utf8' });
        execSync(`apidoc -i ./dist/${name} -o apidoc/${name}`);

        const docBiscConfig: any = config.configs.find((item) => item.name === name);
        fs.writeFileSync(path.join(docApiDocPath, 'apidoc.json'), JSON.stringify({
          name,
          version: `${doc.info.version}.1` || docBiscConfig.version,
          description: docBiscConfig.description || name,
          title: docBiscConfig.title || name,
          url: "http://www.apidoc-admin.com/",
        }, null, 2), { encoding: 'utf8' });
        if (index === 0) {
          spinner.update(chalk.cyanBright('  >>>>  文档加载完成'));
          spinner.stop();
          process.exit(0);
        }
      });
    });
}


async function getDoc(url: string) {
  const res: any = await axios.get(`${url}/api-doc/swagger-ui-init.js`).then((res) => {
    return res
  }, (err) => {
    if (err) {
      return '请求异常，请检查网络'
    }
    return null;
  }).catch((error) => {
    if (error) {
      console.log(chalk.redBright(error))
    }
  }).finally(() => {
    return '请求完毕';
  });
  if (res === '请求异常，请检查网络') {
    return null;
  }
  const json = res.data.match(
    /var options = ({\s+"swaggerDoc"[\s\S]+});\s+url = options.swaggerUrl/m
  );
  if (!json || !json[1]) {
    console.log('文档解析失败')
    process.exit(1);
  }
  let config = JSON.parse(json[1]);
  if (!config) {
    console.info('文档读取失败')
    process.exit(1);
  }
  return config.swaggerDoc
}