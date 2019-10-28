"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGeneratePath(path, methods, modules, version) {
    if (path === void 0) { path = ""; }
    if (methods === void 0) { methods = {}; }
    if (modules === void 0) { modules = {}; }
    var methodKeys = Object.keys(methods);
    return methodKeys.map(function (method) {
        var methodValue = methods[method];
        var description = methodValue.summary || path + "-" + method, params = getGenerateParams(methodValue.parameters, modules);
        return {
            path: path,
            method: method,
            description: description,
            params: params,
            version: version,
            tags: methodValue.tags ? methodValue.tags.join('/') : 'default'
        };
    });
}
exports.getGeneratePath = getGeneratePath;
function getGenerateParams(params, modules) {
    if (params === void 0) { params = []; }
    return params.map(function (item) {
        var _param = {
            type: item.type || 'Object',
            name: item.name,
            required: item.required,
            in: item.in,
            description: item.description || ''
        };
        if (item.schema && item.schema.$ref) {
            _param.ref = item.schema.$ref;
        }
        return _param;
    });
}
exports.getGenerateParams = getGenerateParams;
function getGenerateModule(ref, modules) {
    if (modules === void 0) { modules = {}; }
}
exports.getGenerateModule = getGenerateModule;
