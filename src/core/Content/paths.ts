import { Paths } from "../Context/interface";
import { Path, getModuleSchemaRefToObject, getRefName, Definition } from "./swagger";

export function getParamsRefToObject(paths: Paths, modules: Definition) {
  const params: { [key: string]: Path } = paths.params;
  return params.map((param) => {
    let modulename = getRefName(param.ref);
    if (!modulename) {
      return param;
    }
    delete param.ref;
    param.children = getModuleSchemaRefToObject(modulename, modules);
    return param;
  })
}