import { Swagger, SwaggerPaths, SwaggerDefinition, Modules, Schemas } from "./swagger";
import { getGeneratePath, Paths } from "./paths";

export default class Content {
  constructor(
    private readonly doc: Swagger
  ) { }

  getPath() {
    const paths: SwaggerPaths = this.doc.paths;
    const pathsKey = Object.keys(paths);
    let pathsArr: Paths[] = [];
    pathsKey.forEach((item) => {
      const _paths = getGeneratePath(item, paths[item], this.doc.definitions, `${this.doc.info.version}.0`);
      pathsArr = pathsArr.concat(_paths);
    });
    return pathsArr;
  }

  getModule(): Schemas[] {
    const modules: SwaggerDefinition = this.doc.definitions;
    const modulesKey = Object.keys(modules);
    return modulesKey.map((item) => {
      const { type, properties, required } = modules[item];
      const fields = Object.keys(properties).map((item) => {
        const { allOf, items, type, description, title } = properties[item];
        let _description = allOf && allOf[1] && allOf[1].description || description || '',
          _type = type ? type : 'object',
          _ref = allOf && allOf[0] && allOf[0].$ref ? allOf[0].$ref : items && items.$ref ? items.$ref : null;
        const _m: Modules = {
          name: item,
          type: _type,
          description: _description,
          required: required && required.indexOf(item) >= 0 ? true : false
        }
        if (_ref) {
          _m.ref = _ref;
        }
        return _m;
      });
      return {
        name: item,
        type,
        fields
      }
    })
  }
}