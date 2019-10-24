export interface Info {
  description?: string;
  version?: string;
  title?: string;
}

export interface Paths {
  method: string;
  path: string;
  title: string;
  tags: string;
  params: Array<Params>;
  responses: Array<Response>
}

export interface Modules {
  type: string;
  name: string;
  schema?: ModuleSchema;
  description?: string;
}

export interface ModuleSchema {
  [key: string]: { type: string; name: string; required: boolean; description?: string; ref?: string }
}

export interface Params {
  type: string;
  name: string;
  required: boolean;
  in: string;
  ref?: string;
  default?: any;
  description?: string;
}

export interface Response {
  status?: string;
  description?: string;
  schema?: Schema | any;
}

interface Schema {
  type: string;
  ref?: string;
}

export interface ContextObj {
  info: Info,
  Paths: Paths[],
  Modules: Modules[]
}