export interface Swagger {
  info: Info;
  basePath: string;
  tags: string[];
  schemes: string[];
  paths: SwaggerPaths;
  definitions: SwaggerDefinition;
}

export interface SwaggerPaths {
  [key: string]: SwaggerPath
}

export interface SwaggerPathMethod {
  summary: string;
  parameters: SwaggerParameters[];
  responses: Response;
  tags: string[];
}


export interface SwaggerDefinition {
  [key: string]: SwaggerModule
}

export interface SwaggerModule {
  type: string;
  properties: SwaggerPropertie;
  required: string[];
}

export interface SwaggerPropertie {
  [key: string]: SwaggerPropertieField
}

export interface SwaggerPropertieField {
  type?: string;
  description?: string;
  title?: string;
  items?: { [key: string]: string };
  allOf?: { [key: string]: string }[];
}

export interface SwaggerPath {
  [key: string]: SwaggerPathMethod
}

export interface Response {
  [key: string]: {
    description: string;
    schema?: Schema;
  }
}

export interface SwaggerParameters {
  type: string;
  name: string;
  required: boolean;
  in: 'header' | 'body' | 'query' | 'param';
  schema?: Schema;
  description?: string
}

export interface Modules {
  name: string,
  type: string,
  description: string,
  required: boolean,
  ref?: string
}

export interface Schemas {
  name: string;
  type: string;
  fields: Modules[];
}

export interface Schema {
  [key: string]: string;
}

export interface Info {
  description: string;
  version: string;
  title: string;
}

export function getRefName(ref: string = ''): string {
  const name = ref.split('/').pop();
  if (name) {
    return name;
  }
  return ref;
}

// export interface Module {
//   type: string;
//   default?: any;
//   description: string;
//   required: boolean;
//   properties: SwaggerPropertie;
// }

interface Module {
  type: string;
  description: string;
  name: string;
  fileds?: Module[] | null;
  require?: boolean;
}

export function getModuleSchemaRefToObject(name: string, modules: SwaggerDefinition = {}, title: string = '', require: boolean = false): Module[] | null {
  if (name === '') {
    return null;
  }
  const { type, properties = {}, required } = modules[name];
  const fileds: Module[] = Object.keys(properties).map((item) => {
    const { type = '', description, items, title, allOf } = properties[item];
    const ref = items && items.$ref ? items.$ref : allOf && allOf[0] && allOf[0].$ref ? allOf[0].$ref : null;
    const _description = allOf && allOf[1] && allOf[1].description || description || '';
    const _type = allOf ? 'Object' : type;
    const fileds: Module = {
      name: item,
      description: _description,
      type: _type,
      require: required.indexOf(item) >= 0 ? true : false
    }
    if (!!ref) {
      fileds.fileds = getModuleSchemaRefToObject(getRefName(ref), modules, _description);
    }
    return fileds;
  });
  return [{
    name,
    type,
    description: title,
    fileds,
    require
  }]
}
