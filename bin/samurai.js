#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var command_loader_1 = require("../src/lib/command/command.loader");
function main() {
    var program = commander_1.default;
    program.version(require('../package.json').version)
        .usage('<command> [options]');
    command_loader_1.CommandLoader.load(program);
    commander_1.default.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
    }
}
exports.main = main;
;
main();
