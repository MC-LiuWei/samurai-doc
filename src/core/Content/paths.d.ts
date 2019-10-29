import { SwaggerDefinition, SwaggerPath, SwaggerParameters, SwaggerResponse } from "./swagger";
export declare function getGeneratePath(path: string | undefined, methods: SwaggerPath | undefined, modules: SwaggerDefinition | undefined, version: string): Paths[];
export interface Paths {
    path: string;
    tags: string;
    version: string;
    method: string;
    description: string;
    response: ResponseArr[];
    params: Params[];
}
export interface ResponseArr {
    name: string;
    description: string;
    ref?: string | null;
}
export interface Params {
    type?: string;
    name: string;
    required: boolean;
    in: string;
    ref?: string;
    description?: string;
}
export declare function getGenerateParams(params: SwaggerParameters[] | undefined, modules: SwaggerDefinition): Params[];
export declare function getGenerateSuccess(data: SwaggerResponse, modules: SwaggerDefinition): {
    name: string;
    description: string;
    ref: string;
}[];
export declare function getGenerateModule(ref: string, modules?: SwaggerDefinition): void;
//# sourceMappingURL=paths.d.ts.map