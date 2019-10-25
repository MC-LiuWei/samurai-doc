"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_1 = require("./swagger");
function getParamsRefToObject(paths, modules) {
    var params = paths.params;
    return params.map(function (param) {
        var modulename = swagger_1.getRefName(param.ref);
        if (!modulename) {
            return param;
        }
        delete param.ref;
        param.children = swagger_1.getModuleSchemaRefToObject(modulename, modules);
        return param;
    });
}
exports.getParamsRefToObject = getParamsRefToObject;
