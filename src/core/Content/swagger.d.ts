export interface Swagger {
    info: Info;
    Modules: Module[];
    Paths: Path[];
}
export interface Module {
    type: string;
    name: string;
    schema: {
        [key: string]: Schema;
    };
}
export interface Path {
    title: string;
    method: string;
    path: string;
    tags: string;
    params: Param[];
    responses: Response[];
}
export interface Param {
    name: string;
    type: string;
    required: boolean;
    in: string;
    ref?: string;
    children?: Module | null | undefined;
}
export interface Response {
    status: string;
    schema: {
        type?: string;
        ref?: string;
    };
}
export interface Schema {
    type: string;
    name: string;
    required: boolean;
    description: string;
    ref?: string;
    children?: Module | null | undefined;
}
export interface Info {
    description: string;
    version: string;
    title: string;
}
export declare function getRefName(ref?: string): string | null | undefined;
export declare function getModuleSchemaRefToObject(name: string | null | undefined, modules: Module[]): Module | null | undefined;
//# sourceMappingURL=swagger.d.ts.map