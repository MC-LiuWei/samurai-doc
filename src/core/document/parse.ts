import { Task } from '../Boss/interface';
import { Params } from '../Content/paths';
import { SwaggerModule, Modules, Schemas } from '../Content/swagger';

function generateApiName(path: string, method: string) {
  const pathArr = path.split('/');
  if (path[0] === '/') {
    pathArr.shift();
  }
  return `${pathArr.join('-')}-${method}`
}

function getPathParams(params: Params[], modules: Schemas[]) {

  return params.map((item, index) => {
    if (item.ref) {
      const refname = item.ref.split('/').pop();
      const _module: any = modules.find((item) => item.name === refname);
      return `* @apiParam (${item.in}) {${item.type}} ${item.in} ${item.description}\n  ${getModules(`@apiParam (${item.in})`, item.in, _module, modules)}`
    }
    return `* @apiParam (${item.in}) {${item.type}} ${item.name} ${item.description}\n`
  }).join('');
}

function getModules(tag: string, parent: string, dto: Schemas, modules: Schemas[]): string {
  const { type, name, fields } = dto;
  if (fields && fields.length !== 0) {
    return fields.map((item) => {
      const { name, description, type, ref, required } = item;
      if (ref) {
        let refname = ref.split('/').pop();
        let _dto: any = modules.find((_m) => _m.name === refname);
        return `* ${tag} {${type}} ${!required ? `[${parent}.${name}]` : `${parent}.${name}`} ${description}\n ${getModules(tag, `${parent}.${name}`, _dto, modules)}`
      }
      return `* ${tag} {${type}} ${!required ? `[${parent}.${name}]` : `${parent}.${name}`} ${description}\n`
    }).join('');
  }
  return '';
}

export function parseDocObject(task: Task): string {


  return `
  /** 
   * @api {${task.message.method}} ${task.message.path} ${task.message.description}
   * @apiName ${generateApiName(task.message.path.replace(/\s+/g, ""), task.message.method)}
   * @apiGroup ${task.message.tags}
   * @ApiVersion ${task.message.version}
   * @apiDescription ${task.message.description}
   ${getPathParams(task.message.params, task.modules)}
   */
  `;
}