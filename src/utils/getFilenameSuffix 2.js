"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFilenameSuffix(filename) {
    var l1 = filename.lastIndexOf('.'), l2 = filename.length;
    if (l1 <= 0) {
        return null;
    }
    return filename.substring(l1, l2);
}
exports.getFilenameSuffix = getFilenameSuffix;
