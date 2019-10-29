export interface Swagger {
    info: Info;
    basePath: string;
    tags: string[];
    schemes: string[];
    paths: SwaggerPaths;
    definitions: SwaggerDefinition;
}
export interface SwaggerPaths {
    [key: string]: SwaggerPath;
}
export interface SwaggerPathMethod {
    summary: string;
    parameters: SwaggerParameters[];
    responses: SwaggerResponse;
    tags: string[];
}
export interface SwaggerDefinition {
    [key: string]: SwaggerModule;
}
export interface SwaggerModule {
    type: string;
    properties: SwaggerPropertie;
    required: string[];
}
export interface SwaggerPropertie {
    [key: string]: SwaggerPropertieField;
}
export interface SwaggerPropertieField {
    type?: string;
    description?: string;
    title?: string;
    items?: {
        [key: string]: string;
    };
    allOf?: {
        [key: string]: string;
    }[];
}
export interface SwaggerPath {
    [key: string]: SwaggerPathMethod;
}
export interface SwaggerResponse {
    [key: string]: {
        description: string;
        schema?: Schema;
    };
}
export interface SwaggerParameters {
    type: string;
    name: string;
    required: boolean;
    in: 'header' | 'body' | 'query' | 'param';
    schema?: Schema;
    description?: string;
}
export interface Modules {
    name: string;
    type: string;
    description: string;
    required: boolean;
    ref?: string;
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
export declare function getRefName(ref?: string): string;
interface Module {
    type: string;
    description: string;
    name: string;
    fileds?: Module[] | null;
    require?: boolean;
}
export declare function getModuleSchemaRefToObject(name: string, modules?: SwaggerDefinition, title?: string, require?: boolean): Module[] | null;
export {};
//# sourceMappingURL=swagger.d.ts.map