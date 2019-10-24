"use strict";
// import { Modules } from '../Context/interface';
// export function getModules(ref: string, modules: Array<Modules>) {
//   const name = ref.split('/').pop();
//   return modules.find((item) => item.name === name) || { name: null, description: null, type: null, schema: null };
// }
// export function modulesToDoc(tag: string, ref: string, modules: Array<Modules>) {
//   const { name, description, type, schema } = getModules(ref, modules);
//   if (!name) {
//     return;
//   }
//   if (!schema) {
//   }
//   function _modulesToDoc(_indent: number = 0, _tag: string, _parent: string[], _ref: string, _modules: Modules[]) {
//     const { name, type, description, schema } = getModules(ref, modules);
//     if (!name) { return; }
//     _parent.push(name);
//     if (!schema) {
//       return renderDoc(' '.repeat(_indent), tag, _parent.join('.'), type, description);
//     }
//     const schemaKeys = Object.keys(schema);
//     return schemaKeys.map((item) => {
//       const { name, type, required, ref, description } = schema[item];
//       const parent = _parent;
//       parent.push(name);
//       if (!ref) {
//         return renderDoc(' '.repeat(_indent), tag, parent.join('.'), type, description);
//       }
//       return _modulesToDoc(_indent + 1, tag, parent, ref, modules);
//     });
//   }
// }
// export function renderDoc(indent: string = '', tag: string, name: string, type: string = '', description: string = '') {
//   return `${indent}@${tag} {${type}} ${name} ${description} \n`
// }
