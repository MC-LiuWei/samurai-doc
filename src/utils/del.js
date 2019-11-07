"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function del(path) {
    var isExists = fs_1.existsSync(path);
    if (isExists) {
        var isFile = fs_1.statSync(path).isFile();
        if (isFile) {
            fs_1.unlinkSync(path);
        }
        else {
            var files = fs_1.readdirSync(path);
            files.forEach(function (item) {
                var currPath = path + "/" + item;
                del(currPath);
            });
            fs_1.rmdirSync(path);
        }
    }
}
exports.del = del;
