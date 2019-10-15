import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { AbstractAction } from "./abstract.action";
import { Input } from "../command/command.input";
import Context from '../../core/Context';
import { getFilenameSuffix } from '../../utils/getFilenameSuffix';
import { generateDoc } from '../../core/generateDoc';

export interface ConfigInterface {
  url: string;
  output: string;
}

export class BuildAction extends AbstractAction {
  public async handle(param: Input[]) {
    const configPath = param.find((item) => item.name === 'config')!.value;
    const strConfigPath = String(configPath);
    if (!configPath || !getFilenameSuffix(strConfigPath)) {
      console.log();
      process.exit(1);
    }

    const _configPath = path.join(process.cwd(), strConfigPath);
    const config: ConfigInterface = JSON.parse(fs.readFileSync(_configPath, { encoding: 'utf-8' }));
    const doc = await getDoc(config.url);
    Context.generateInfo({
      description: doc.info.description,
      version: doc.info.version,
      title: doc.info.title
    });
    Context.generateModule(doc.definitions);
    Context.generatePaths(doc.paths);
    const configs = Context.getContext();
    //await fs.writeFileSync(path.join(process.cwd(), 'test.json'), JSON.stringify(configs, null, 2), { encoding: 'utf-8' })
    await generateDoc(Context.getContext());
  }
}


async function getDoc(url: string) {
  const res = await axios.get(`${url}/api-doc/swagger-ui-init.js`);
  const json = res.data.match(
    /var options = ({\s+"swaggerDoc"[\s\S]+});\s+url = options.swaggerUrl/m
  );
  if (!json || !json[1]) {
    console.log()
    process.exit(1);
  }
  let config = JSON.parse(json[1]);
  if (!config) {
    console.log()
    process.exit(1);
  }
  return config.swaggerDoc
}