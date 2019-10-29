import { SwaggerDefinition, SwaggerPath, SwaggerParameters, SwaggerResponse } from "./swagger";


export function getGeneratePath(path: string = "", methods: SwaggerPath = {}, modules: SwaggerDefinition = {}, version: string): Paths[] {
  const methodKeys = Object.keys(methods);
  return methodKeys.map((method) => {
    const methodValue = methods[method];
    let description = methodValue.summary || `${path}-${method}`,
      params = getGenerateParams(methodValue.parameters, modules),
      response = getGenerateSuccess(methodValue.responses, modules);
    const data: Paths = {
      path,
      method,
      description,
      params,
      version,
      response,
      tags: methodValue.tags ? methodValue.tags!.join('/') : 'default'
    }
    return data;
  });
}

export interface Paths {
  path: string;
  tags: string;
  version: string;
  method: string;
  description: string;
  response: ResponseArr[];
  params: Params[]
}

export interface ResponseArr {
  name: string, description: string; ref?: string | null; type: string | null;
}

export interface Params {
  type?: string;
  name: string;
  required: boolean;
  in: string;
  ref?: string;
  description?: string;
}

export function getGenerateParams(params: SwaggerParameters[] = [], modules: SwaggerDefinition): Params[] {
  return params.map((item) => {
    const _param: Params = {
      type: item.type || 'Object',
      name: item.name,
      required: item.required,
      in: item.in,
      description: item.description || ''
    }
    if (item.schema && item.schema.$ref) {
      _param.ref = item.schema.$ref
    }
    return _param;
  })
}

export function getGenerateSuccess(data: SwaggerResponse, modules: SwaggerDefinition) {
  const resKey = Object.keys(data);
  return resKey.map((item) => {
    const { description, schema } = data[item];
    return {
      name: item,
      description: description || `${item}`,
      type: schema && schema.type && schema.type || null,
      ref: schema && schema.$ref && schema.$ref || ""
    }
  })
}

export function getGenerateModule(ref: string, modules: SwaggerDefinition = {}) { }