"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var docDataLoader_1 = require("../generateDoc/docDataLoader");
process.on('message', function (task) {
    var doc = docDataLoader_1.parseDocObject(task);
    process.send(doc);
});
