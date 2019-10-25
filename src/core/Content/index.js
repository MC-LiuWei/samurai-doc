"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paths_1 = require("./paths");
var Content = /** @class */ (function () {
    function Content(doc) {
        this.doc = doc;
    }
    Content.prototype.getPath = function () {
        var _this = this;
        var paths = this.doc.Paths;
        console.log(paths);
        return paths.map(function (item) { return paths_1.getParamsRefToObject(item, _this.doc.Modules); });
    };
    return Content;
}());
exports.default = Content;
