"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateApiName(path, method) {
    var pathArr = path.split('/');
    if (path[0] === '/') {
        pathArr.shift();
    }
    return pathArr.join('-') + "-" + method;
}
function getParams(params, type) {
    return params
        .map(function (item) {
        if (item.in === type) {
            return item;
        }
        return undefined;
    })
        .filter(function (item) { return !!item; });
}
function generateApiHeader(params, indent, modules) {
    var indentStr = ' '.repeat(indent);
    var type = 'apiHeader';
    return getParams(params, 'header')
        .map(function (item) {
        return "* @apiHeader {" + item.type + "} " + item.name + " " + (item.description || '') + "\n      ";
    })
        .join('');
}
function generateApiParams(params) {
    return getParams(params, 'body');
}
function generateApiQuery(params) {
    return getParams(params, 'query');
}
function renderString(indent, type, data) {
    return indent + " * @" + type + " {" + data.type + "} " + data.name + " " + data.info + " \n";
}
function parseDocObject(task) {
    return "\n  /** \n   * @api {" + task.message.method + "} " + task.message.path + " " + task.message.title + "\n   * @apiName " + generateApiName(task.message.path.replace(/\s+/g, ""), task.message.method) + "\n   * @apiGroup " + task.message.tags + "\n   * @ApiVersion " + task.info.version + "\n   * @apiDescription " + task.message.title + "\n   */\n  ";
}
exports.parseDocObject = parseDocObject;
