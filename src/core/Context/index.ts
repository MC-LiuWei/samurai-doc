import { Info, Paths, Modules, ModuleSchema, Params, Response } from './interface';

class Context {
  private info: Info = {};
  private Paths: Array<Paths> = [];
  private Modules: Array<Modules> = [];

  private parseModuleSchema(schema: any, required: [] = []): ModuleSchema {
    const _schema: ModuleSchema = {};
    if (!schema) {
      return _schema;
    }
    const keys = Object.keys(schema);
    keys.forEach((key: string) => {
      const type = this.schemaType(schema[key]);
      const schemaDesc = this.schemaDesc(schema[key]);
      const ref = this.schemaRef(schema[key]);
      _schema[key] = {
        type,
        name: key,
        required: required.indexOf(key) > -1,
      }
      if (schemaDesc) {
        _schema[key]['description'] = schemaDesc;
      }
      if (ref) {
        _schema[key].ref = ref;
      }
    });
    return _schema;
  }

  /**
   * 获取schema的类型
   * @param schema 
   */
  private schemaType(schema: any) {
    console.log(schema);
    if (schema['title'] && schema['allOf']) {
      return 'object';
    }
    return schema['type']
  }

  /**
   * 获取schema映射的连接
   * @param schema 
   */
  private schemaRef(schema: any) {
    if (schema['allOf'] && schema['allOf'][0] && schema['allOf'][0]['$ref']) {
      return schema['allOf'][0]['$ref'];
    }
    if (schema['items'] && schema['items']['$ref']) {
      return schema['items']['$ref'];
    }
    return null
  }

  /**
   * 获取字段的描述
   * @param schema 
   */
  private schemaDesc(schema: any) {
    if (schema['description']) {
      return schema['description'];
    }
    if (schema['allOf'] && schema['allOf'][1] && schema['allOf'][1]['description']) {
      return schema['allOf'][1]['description'];
    }
    return null;
  }

  private parsePath(paths: any, name: string) {
    const methods = Object.keys(paths);
    methods.forEach((method) => {
      this.Paths.push({
        title: paths[method]['summary'],
        method,
        path: name,
        tags: paths[method]['tags'] ? paths[method]['tags'][0] : null,
        params: this.parseParams(paths[method]['parameters']),
        responses: this.parseRes(paths[method]['responses'])
      });
    })
  }

  private parseRes(res: any) {
    const status = Object.keys(res);
    return status.map((statu) => {
      const _res: Response = {};
      if (res[statu]) {
        _res.status = statu;
      }
      if (res[statu]['description']) {
        _res.description = res[statu]['description'];
      }
      if (res[statu]['schema']) {
        _res.schema = this.parseResSchema(res[statu]['schema']);
      }
      return _res;
    })
  }

  private parseResSchema(schema: any) {
    if (!schema['$ref']) {
      return null;
    }
    return {
      type: schema['$ref'].split('/').pop(),
      ref: schema['$ref']
    }
  }

  private parseParams(params: any[] = []) {
    return params.map((param) => {
      const temp: Params = {
        name: param['name'],
        type: param['schema'] ? param['name'] : param['type'],
        required: param['required'],
        in: param['in'],
      }
      if (param['schema']) {
        temp['ref'] = param['schema']['$ref'];
      }
      return temp;
    })
  }

  public generateModule(module: any) {
    const keys = Object.keys(module);
    keys.forEach((key) => {
      this.Modules.push({
        type: module[key].type,
        name: key,
        schema: this.parseModuleSchema(module[key]['properties'], module[key]['required'])
      })
    })
  }

  public generatePaths(paths: any) {
    const keys = Object.keys(paths);
    keys.forEach((key) => {
      this.parsePath(paths[key], key);
    })
  }

  public generateInfo(info: Info) {
    this.info = info;
  }

  public getContext() {
    return {
      info: this.info,
      modules: this.Modules,
      paths: this.Paths
    }
  }
}

export default new Context()
