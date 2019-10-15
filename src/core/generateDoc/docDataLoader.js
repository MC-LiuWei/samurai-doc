"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = __importDefault(require("../Context"));
function parseDocObject(task) {
    console.log('任务', Context_1.default.getInfo());
    return '{ "di": 1}';
}
exports.parseDocObject = parseDocObject;
