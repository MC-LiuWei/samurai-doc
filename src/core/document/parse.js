"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateApiName(path, method) {
    var pathArr = path.split('/');
    if (path[0] === '/') {
        pathArr.shift();
    }
    return pathArr.join('-') + "-" + method;
}
function getPathParams(params, modules) {
    return params.map(function (item, index) {
        if (item.ref) {
            var refname_1 = item.ref.split('/').pop();
            var _module = modules.find(function (item) { return item.name === refname_1; });
            return "  * @apiParam (" + item.in + ") {" + item.type + "} " + (!item.required ? "[" + item.in + "]" : "" + item.in) + " " + item.description + "\n" + getModules("@apiParam (" + item.in + ")", item.in, _module, modules);
        }
        return "  * @apiParam (" + item.in + ") {" + item.type + "} " + (!item.required ? "[" + item.name + "]" : "" + item.name) + " " + item.description + "\n";
    }).join('');
}
function getModules(tag, parent, dto, modules) {
    var type = dto.type, fields = dto.fields;
    if (fields && fields.length !== 0) {
        return fields.map(function (item) {
            var name = item.name, description = item.description, type = item.type, ref = item.ref, required = item.required;
            if (ref) {
                var refname_2 = ref.split('/').pop();
                if (refname_2 !== dto.name) {
                    var _dto = modules.find(function (_m) { return _m.name === refname_2; });
                    return "  * " + tag + " {" + type + "} " + (!required ? "[" + parent + "." + name + "]" : parent + "." + name) + " " + description + "\n" + getModules(tag, parent + "." + name, _dto, modules) + "\n";
                }
                return "  * " + tag + " {" + type + "} " + (!required ? "[" + parent + "." + name + "]" : parent + "." + name) + " " + description + "-\u5FAA\u73AF\u7ED3\u6784->" + parent + "\n";
            }
            return "  * " + tag + " {" + type + "} " + (!required ? "[" + parent + "." + name + "]" : parent + "." + name) + " " + description + "\n";
        }).join('');
    }
    return '';
}
function getApiSuccess(res, modules) {
    return res.map(function (item) {
        if (item.ref && item.ref !== '') {
            var refname_3 = item.ref.split('/').pop();
            var _module = modules.find(function (item) { return item.name === refname_3; });
            return "  * @apiSuccess {" + _module.type + "} data " + item.description + "\n" + getModules("@apiSuccess ", 'data', _module, modules);
        }
        return "  * apiSuccess {Object} data " + item.description + "\n";
    }).join('');
}
function parseDocObject(task) {
    var res = task.message.response;
    return "\n  /** \n   * @api {" + task.message.method + "} " + task.message.path + " " + task.message.description + "\n   * @apiName " + generateApiName(task.message.path.replace(/\s+/g, ""), task.message.method) + "\n   * @apiGroup " + task.message.tags + "\n   * @ApiVersion " + task.message.version + "\n   * @apiDescription " + task.message.description + "\n    " + getPathParams(task.message.params, task.modules) + "\n    " + getApiSuccess(res, task.modules) + "\n   */\n  ";
}
exports.parseDocObject = parseDocObject;
