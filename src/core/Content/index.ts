import { Swagger } from "./swagger";
import { Paths } from "../Context/interface";
import { getParamsRefToObject } from "./paths";

export default class Content {
  constructor(
    private readonly doc: Swagger
  ) { }

  getPath() {
    const paths: Paths[] = this.doc.Paths;
    console.log(paths)
    return paths.map((item) => getParamsRefToObject(item, this.doc.Modules))
  }
}