import { Info, Paths, Modules, ContextObj } from './interface';
declare class Context {
    private static info;
    private static Paths;
    private static Modules;
    private parseModuleSchema;
    /**
     * 获取schema的类型
     * @param schema
     */
    private schemaType;
    /**
     * 获取schema映射的连接
     * @param schema
     */
    private schemaRef;
    /**
     * 获取字段的描述
     * @param schema
     */
    private schemaDesc;
    private parsePath;
    private parseRes;
    /**
     * 拆分返回信息结构
     * @param schema
     */
    private parseResSchema;
    /**
     * 拆分入参结构
     * @param params
     */
    private parseParams;
    generateModule(module: any): void;
    generatePaths(paths: any): void;
    generateInfo(info: Info): void;
    getContext(): ContextObj;
    getPaths(): Paths[];
    getModule(): Modules[];
    getInfo(): Info;
}
declare const _default: Context;
export default _default;
//# sourceMappingURL=index.d.ts.map