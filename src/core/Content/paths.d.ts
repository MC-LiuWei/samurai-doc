import { SwaggerDefinition, SwaggerPath, SwaggerParameters } from "./swagger";
export declare function getGeneratePath(path: string | undefined, methods: SwaggerPath | undefined, modules: SwaggerDefinition | undefined, version: string): {
    path: string;
    method: string;
    description: string;
    params: Params[];
    version: string;
    tags: string;
}[];
export interface Paths {
    path: string;
    tags: string;
    version: string;
    method: string;
    description: string;
    params: Params[];
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
export declare function getGenerateModule(ref: string, modules?: SwaggerDefinition): void;
//# sourceMappingURL=paths.d.ts.map