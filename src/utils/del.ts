import { existsSync, statSync, unlinkSync, readdirSync, rmdirSync } from "fs";

export function del(path: string) {
  const isExists = existsSync(path);
  if (isExists) {
    const isFile = statSync(path).isFile();
    if (isFile) {
      unlinkSync(path);
    } else {
      const files = readdirSync(path);
      files.forEach((item) => {
        const currPath = `${path}/${item}`;
        del(currPath);
      });
      rmdirSync(path);
    }
  }
}