export interface Swagger {
  info: Info;
  basePath: string;
  tags: string[];
  schemes: string[];
  paths: { [key: string]: Path };
  definitions: Definition;
}

export interface Definition {
  [key: string]: {
    type: string;
    properties: Propertie;
    required: string[];
  }
}

export interface Propertie {
  [key: string]: {
    type?: string;
    description?: string;
    title?: string;
    items?: { [key: string]: string };
    allOf?: { [key: string]: string }[];
  }
}

export interface Module {
  type: string;
  name: string;
  schema: { [key: string]: Schema }
}

export interface Path {
  [key: string]: {
    summary: string;
    parameters: Parameters[];
    responses: Response;
    tags: string[];
  }
}

export interface Response {
  [key: string]: {
    description: string;
    schema?: Schema;
  }
}

export interface Parameters {
  type?: string;
  name: string;
  required: boolean;
  in: 'header' | 'body' | 'query' | 'param';
  schema?: Schema;
}

export interface Schema {
  [key: string]: string;
}

export interface Info {
  description: string;
  version: string;
  title: string;
}

export function getRefName(ref?: string | undefined | null): string | null | undefined {
  if (!ref) {
    return null;
  }
  return ref.split('/').pop();
}

export interface Module {
  type: string;
  default?: any;
  description: string;
  required: boolean;
  properties: Propertie;
}

export function getModuleSchemaRefToObject(name: string | null | undefined, modules: Definition) {
  if (!name) {
    return null;
  }
  const { type, properties, required } = modules[name];

  const _moduleKeys = Object.keys(properties).map((item) => {
    const keyValue = properties[item];
    /** model地址连接 **/
    const $ref = keyValue.items ? keyValue.items.$ref : keyValue.allOf && keyValue.allOf[0] ? keyValue.allOf[0].$ref : null;
    return {
      type: keyValue.type,
      description: keyValue.description ? keyValue.description : keyValue.allOf && keyValue.allOf[1] ? keyValue.allOf[1].$ref : '',
      required: required.indexOf(item) >= 0 ? true : false,
      properties: getModuleSchemaRefToObject(getRefName($ref), modules)
    }
  });
}
