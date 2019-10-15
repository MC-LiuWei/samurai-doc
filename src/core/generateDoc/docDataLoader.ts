import { Task } from '../Boss/interface';
import { Params, Modules } from '../Context/interface';

interface DocData {
  type: string;
  name: string;
  info: string
}

function generateApiName(path: string, method: string) {
  const pathArr = path.split('/');
  if (path[0] === '/') {
    pathArr.shift();
  }
  return `${pathArr.join('-')}-${method}`
}

function getParams(params: Array<Params>, type: string) {
  return params
    .map((item) => {
      if (item.in === type) {
        return item;
      }
      return undefined;
    })
    .filter((item) => !!item);
}

function generateApiHeader(params: Array<Params>, indent: number, modules: Array<Modules>) {
  const indentStr = ' '.repeat(indent);
  const type = 'apiHeader';
  return getParams(params, 'header')
    .map((item: any) => {
      return `* @apiHeader {${item.type}} ${item.name} ${item.description || ''}
      `;
    })
    .join('');
}

function generateApiParams(params: Array<Params>) {
  return getParams(params, 'body');
}

function generateApiQuery(params: Array<Params>) {
  return getParams(params, 'query');
}

function renderString(indent: string, type: string, data: DocData) {
  return `${indent} * @${type} {${data.type}} ${data.name} ${data.info} \n`
}

function modulesTodoc(type: string, parentName: string, ref: string, modules: Array<Modules>) {
  const name = ref.split('/').pop();
  const _module = modules.find((item) => item.name === name);
}

export function parseDocObject(task: Task): string {
  return `
  /** 
   * @api {${task.message.method}} ${task.message.path} ${task.message.title}
   * @apiName ${generateApiName(task.message.path.replace(/\s+/g, ""), task.message.method)}
   * @apiGroup ${task.message.tags}
   * @ApiVersion ${task.info.version}
   * @apiDescription ${task.message.title}
   */
  `;
}
