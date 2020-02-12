"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRefName(ref) {
    if (ref === void 0) { ref = ''; }
    var name = ref.split('/').pop();
    if (name) {
        return name;
    }
    return ref;
}
exports.getRefName = getRefName;
function getModuleSchemaRefToObject(name, modules, title, require) {
    if (modules === void 0) { modules = {}; }
    if (title === void 0) { title = ''; }
    if (require === void 0) { require = false; }
    if (name === '') {
        return null;
    }
    var _a = modules[name], type = _a.type, _b = _a.properties, properties = _b === void 0 ? {} : _b, required = _a.required;
    var fileds = Object.keys(properties).map(function (item) {
        var _a = properties[item], _b = _a.type, type = _b === void 0 ? '' : _b, description = _a.description, items = _a.items, title = _a.title, allOf = _a.allOf;
        var ref = items && items.$ref ? items.$ref : allOf && allOf[0] && allOf[0].$ref ? allOf[0].$ref : null;
        var _description = allOf && allOf[1] && allOf[1].description || description || '';
        var _type = allOf ? 'Object' : type;
        var fileds = {
            name: item,
            description: _description,
            type: _type,
            require: required.indexOf(item) >= 0 ? true : false
        };
        if (!!ref) {
            fileds.fileds = getModuleSchemaRefToObject(getRefName(ref), modules, _description);
        }
        return fileds;
    });
    return [{
            name: name,
            type: type,
            description: title,
            fileds: fileds,
            require: require
        }];
}
exports.getModuleSchemaRefToObject = getModuleSchemaRefToObject;
