import { readdirSync, statSync, access, constants, mkdirSync, copyFileSync } from "fs";


export function copy(src: string, target: string) {
  const paths = readdirSync(src);
  paths.forEach(function (path) {
    let _src = `${src}/${path}`,
      _target = `${target}/${path}`;
    const states = statSync(_src);
    if (states.isFile()) {
      copyFileSync(_src, _target);
    }
    if (states.isDirectory()) {
      checkDirectory(_src, _target, copy);
    }
  })
}

function checkDirectory(src: string, target: string, callback: (src: string, target: string) => void) {
  access(target, constants.F_OK, (err) => {
    if (err) {
      mkdirSync(target);
    }
    callback(src, target);
  })
}