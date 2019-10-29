"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGeneratePath(path, methods, modules, version) {
    if (path === void 0) { path = ""; }
    if (methods === void 0) { methods = {}; }
    if (modules === void 0) { modules = {}; }
    var methodKeys = Object.keys(methods);
    return methodKeys.map(function (method) {
        var methodValue = methods[method];
        var description = methodValue.summary || path + "-" + method, params = getGenerateParams(methodValue.parameters, modules), response = getGenerateSuccess(methodValue.responses, modules);
        var data = {
            path: path,
            method: method,
            description: description,
            params: params,
            version: version,
            response: response,
            tags: methodValue.tags ? methodValue.tags.join('/') : 'default'
        };
        return data;
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
function getGenerateSuccess(data, modules) {
    var resKey = Object.keys(data);
    return resKey.map(function (item) {
        var _a = data[item], description = _a.description, schema = _a.schema;
        return {
            name: item,
            description: description || "" + item,
            ref: schema && schema.$ref && schema.$ref || ""
        };
    });
}
exports.getGenerateSuccess = getGenerateSuccess;
function getGenerateModule(ref, modules) {
    if (modules === void 0) { modules = {}; }
}
exports.getGenerateModule = getGenerateModule;
