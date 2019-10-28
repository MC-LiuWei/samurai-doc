import { SwaggerDefinition, SwaggerPath, SwaggerParameters } from "./swagger";


export function getGeneratePath(path: string = "", methods: SwaggerPath = {}, modules: SwaggerDefinition = {}, version: string) {
  const methodKeys = Object.keys(methods);
  return methodKeys.map((method) => {
    const methodValue = methods[method];
    let description = methodValue.summary || `${path}-${method}`,
      params = getGenerateParams(methodValue.parameters, modules);
    return {
      path,
      method,
      description,
      params,
      version,
      tags: methodValue.tags ? methodValue.tags!.join('/') : 'default'
    }
  });
}

export interface Paths {
  path: string;
  tags: string;
  version: string;
  method: string;
  description: string;
  params: Params[]
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

export function getGenerateModule(ref: string, modules: SwaggerDefinition = {}) { }