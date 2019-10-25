"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRefName(ref) {
    if (!ref) {
        return null;
    }
    return ref.split('/').pop();
}
exports.getRefName = getRefName;
function getModuleSchemaRefToObject(name, modules) {
    var _module = modules.find(function (item) { return item.name === name; });
    if (!_module)
        return null;
    if (_module.schema) {
        var schemaKeys = Object.keys(_module.schema);
        schemaKeys.forEach(function (sk) {
            var schemaKeyModule = _module.schema[sk];
            var modulename = getRefName(schemaKeyModule.ref);
            if (modulename) {
                delete schemaKeyModule.ref;
                schemaKeyModule.children = getModuleSchemaRefToObject(modulename, modules);
            }
            _module.schema[sk] = schemaKeyModule;
        });
        return _module;
    }
}
exports.getModuleSchemaRefToObject = getModuleSchemaRefToObject;
