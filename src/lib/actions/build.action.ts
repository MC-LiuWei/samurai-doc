import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { AbstractAction } from "./abstract.action";
import { Input } from "../command/command.input";
import Context from '../../core/Context';
import { version } from 'punycode';

export interface ConfigInterface {
  url: string;
  output: string;
}

export class BuildAction extends AbstractAction {
  public async handle(param: Input[]) {
    const configPath = param.find((item) => item.name === 'config');
    if (!configPath) {
      console.log();
      process.exit(1);
    }
    const _configPath = path.join(process.cwd(), configPath.value);
    const config: ConfigInterface = JSON.parse(fs.readFileSync(_configPath, { encoding: 'utf-8' }));
    const doc = await getDoc(config.url);
    Context.generateInfo({
      description: doc.info.description,
      version: doc.info.version,
      title: doc.info.title
    });
    Context.generateModule(doc.definitions);
    Context.generatePaths(doc.paths);
    console.log(Context.getContext());
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