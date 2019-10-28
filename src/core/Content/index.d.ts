import { Swagger, Schemas } from "./swagger";
import { Paths } from "./paths";
export default class Content {
    private readonly doc;
    constructor(doc: Swagger);
    getPath(): Paths[];
    getModule(): Schemas[];
}
//# sourceMappingURL=index.d.ts.map