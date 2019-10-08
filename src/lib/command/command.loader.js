"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_build_1 = require("./command.build");
var build_action_1 = require("../actions/build.action");
var CommandLoader = /** @class */ (function () {
    function CommandLoader() {
    }
    CommandLoader.load = function (program) {
        new command_build_1.BuildCommand(new build_action_1.BuildAction()).load(program);
    };
    CommandLoader.handleInvalidCommand = function (program) {
        program.on('command:*', function () {
            process.exit(1);
        });
    };
    return CommandLoader;
}());
exports.CommandLoader = CommandLoader;
