"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function copy(src, target) {
    var paths = fs_1.readdirSync(src);
    paths.forEach(function (path) {
        var _src = src + "/" + path, _target = target + "/" + path;
        var states = fs_1.statSync(_src);
        if (states.isFile()) {
            fs_1.copyFileSync(_src, _target);
        }
        if (states.isDirectory()) {
            checkDirectory(_src, _target, copy);
        }
    });
}
exports.copy = copy;
function checkDirectory(src, target, callback) {
    fs_1.access(target, fs_1.constants.F_OK, function (err) {
        if (err) {
            fs_1.mkdirSync(target);
        }
        callback(src, target);
    });
}
