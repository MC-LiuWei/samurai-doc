"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context() {
        this.info = {};
        this.Paths = [];
        this.Modules = [];
    }
    Context.prototype.parseModuleSchema = function (schema, required) {
        var _this = this;
        if (required === void 0) { required = []; }
        var _schema = {};
        if (!schema) {
            return _schema;
        }
        var keys = Object.keys(schema);
        keys.forEach(function (key) {
            var type = _this.schemaType(schema[key]);
            var schemaDesc = _this.schemaDesc(schema[key]);
            var ref = _this.schemaRef(schema[key]);
            _schema[key] = {
                type: type,
                name: key,
                required: required.indexOf(key) > -1,
            };
            if (schemaDesc) {
                _schema[key]['description'] = schemaDesc;
            }
            if (ref) {
                _schema[key].ref = ref;
            }
        });
        return _schema;
    };
    /**
     * 获取schema的类型
     * @param schema
     */
    Context.prototype.schemaType = function (schema) {
        console.log(schema);
        if (schema['title'] && schema['allOf']) {
            return 'object';
        }
        return schema['type'];
    };
    /**
     * 获取schema映射的连接
     * @param schema
     */
    Context.prototype.schemaRef = function (schema) {
        if (schema['allOf'] && schema['allOf'][0] && schema['allOf'][0]['$ref']) {
            return schema['allOf'][0]['$ref'];
        }
        if (schema['items'] && schema['items']['$ref']) {
            return schema['items']['$ref'];
        }
        return null;
    };
    /**
     * 获取字段的描述
     * @param schema
     */
    Context.prototype.schemaDesc = function (schema) {
        if (schema['description']) {
            return schema['description'];
        }
        if (schema['allOf'] && schema['allOf'][1] && schema['allOf'][1]['description']) {
            return schema['allOf'][1]['description'];
        }
        return null;
    };
    Context.prototype.parsePath = function (paths, name) {
        var _this = this;
        var methods = Object.keys(paths);
        methods.forEach(function (method) {
            _this.Paths.push({
                title: paths[method]['summary'],
                method: method,
                path: name,
                tags: paths[method]['tags'] ? paths[method]['tags'][0] : null,
                params: _this.parseParams(paths[method]['parameters']),
                responses: _this.parseRes(paths[method]['responses'])
            });
        });
    };
    Context.prototype.parseRes = function (res) {
        var _this = this;
        var status = Object.keys(res);
        return status.map(function (statu) {
            var _res = {};
            if (res[statu]) {
                _res.status = statu;
            }
            if (res[statu]['description']) {
                _res.description = res[statu]['description'];
            }
            if (res[statu]['schema']) {
                _res.schema = _this.parseResSchema(res[statu]['schema']);
            }
            return _res;
        });
    };
    Context.prototype.parseResSchema = function (schema) {
        if (!schema['$ref']) {
            return null;
        }
        return {
            type: schema['$ref'].split('/').pop(),
            ref: schema['$ref']
        };
    };
    Context.prototype.parseParams = function (params) {
        if (params === void 0) { params = []; }
        return params.map(function (param) {
            var temp = {
                name: param['name'],
                type: param['schema'] ? param['name'] : param['type'],
                required: param['required'],
                in: param['in'],
            };
            if (param['schema']) {
                temp['ref'] = param['schema']['$ref'];
            }
            return temp;
        });
    };
    Context.prototype.generateModule = function (module) {
        var _this = this;
        var keys = Object.keys(module);
        keys.forEach(function (key) {
            _this.Modules.push({
                type: module[key].type,
                name: key,
                schema: _this.parseModuleSchema(module[key]['properties'], module[key]['required'])
            });
        });
    };
    Context.prototype.generatePaths = function (paths) {
        var _this = this;
        var keys = Object.keys(paths);
        keys.forEach(function (key) {
            _this.parsePath(paths[key], key);
        });
    };
    Context.prototype.generateInfo = function (info) {
        this.info = info;
    };
    Context.prototype.getContext = function () {
        return {
            info: this.info,
            modules: this.Modules,
            paths: this.Paths
        };
    };
    return Context;
}());
exports.default = new Context();
