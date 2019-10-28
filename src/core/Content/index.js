"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paths_1 = require("./paths");
var Content = /** @class */ (function () {
    function Content(doc) {
        this.doc = doc;
    }
    Content.prototype.getPath = function () {
        var _this = this;
        var paths = this.doc.paths;
        var pathsKey = Object.keys(paths);
        var pathsArr = [];
        pathsKey.forEach(function (item) {
            var _paths = paths_1.getGeneratePath(item, paths[item], _this.doc.definitions, _this.doc.info.version + ".0");
            pathsArr = pathsArr.concat(_paths);
        });
        return pathsArr;
    };
    Content.prototype.getModule = function () {
        var modules = this.doc.definitions;
        var modulesKey = Object.keys(modules);
        return modulesKey.map(function (item) {
            var _a = modules[item], type = _a.type, properties = _a.properties, required = _a.required;
            var fields = Object.keys(properties).map(function (item) {
                var _a = properties[item], allOf = _a.allOf, items = _a.items, type = _a.type, description = _a.description, title = _a.title;
                var _description = allOf && allOf[1] && allOf[1].description || description || '', _type = type ? type : 'object', _ref = allOf && allOf[0] && allOf[0].$ref ? allOf[0].$ref : items && items.$ref ? items.$ref : null;
                var _m = {
                    name: item,
                    type: _type,
                    description: _description,
                    required: required && required.indexOf(item) >= 0 ? true : false
                };
                if (_ref) {
                    _m.ref = _ref;
                }
                return _m;
            });
            return {
                name: item,
                type: type,
                fields: fields
            };
        });
    };
    return Content;
}());
exports.default = Content;
