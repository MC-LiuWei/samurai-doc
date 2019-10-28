"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("../document/parse");
process.on('message', function (task) {
    var doc = parse_1.parseDocObject(task);
    process.send(doc);
});
