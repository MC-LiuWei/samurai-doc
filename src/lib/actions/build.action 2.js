"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var io_spin_1 = __importDefault(require("io-spin"));
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var axios_1 = __importDefault(require("axios"));
var abstract_action_1 = require("./abstract.action");
var Context_1 = __importDefault(require("../../core/Context"));
var getFilenameSuffix_1 = require("../../utils/getFilenameSuffix");
var generateDoc_1 = require("../../core/generateDoc");
var spinner = io_spin_1.default('  >>>>>>  加载中', "Box1");
var BuildAction = /** @class */ (function (_super) {
    __extends(BuildAction, _super);
    function BuildAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuildAction.prototype.handle = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var configPath, strConfigPath, _configPath, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configPath = param.find(function (item) { return item.name === 'config'; }).value;
                        strConfigPath = String(configPath);
                        if (!configPath || !getFilenameSuffix_1.getFilenameSuffix(strConfigPath)) {
                            process.exit(1);
                        }
                        _configPath = path.join(process.cwd(), strConfigPath);
                        config = JSON.parse(fs.readFileSync(_configPath, { encoding: 'utf-8' }));
                        spinner.update(chalk_1.default.cyanBright('  >>>>  文档加载中'));
                        spinner.start();
                        return [4 /*yield*/, Generate(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BuildAction;
}(abstract_action_1.AbstractAction));
exports.BuildAction = BuildAction;
function Generate(config) {
    return __awaiter(this, void 0, void 0, function () {
        var docConfigs, outputPath, apiDocPath, docTaskQueue;
        var _this = this;
        return __generator(this, function (_a) {
            docConfigs = config.configs;
            outputPath = path.join(process.cwd(), config.output);
            apiDocPath = path.join(process.cwd(), 'apidoc');
            docTaskQueue = [];
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath);
            }
            if (!fs.existsSync(apiDocPath)) {
                fs.mkdirSync(apiDocPath);
            }
            docTaskQueue = docConfigs.map(function (item) {
                return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var doc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getDoc(item.url)];
                            case 1:
                                doc = _a.sent();
                                fs.writeFileSync(path.join(process.cwd(), item.name + ".json"), JSON.stringify(doc, null, 2), { encoding: 'utf8' });
                                res({
                                    name: item.name,
                                    doc: doc,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            Promise.all(docTaskQueue)
                .then(function (res) {
                res.forEach(function (_doc, index) { return __awaiter(_this, void 0, void 0, function () {
                    var doc, name, docOutputPath, docApiDocPath, docContent, docCode, docBiscConfig;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                doc = _doc.doc, name = _doc.name;
                                docOutputPath = path.join(outputPath, name);
                                docApiDocPath = path.join(apiDocPath, name);
                                if (!fs.existsSync(path.join(docOutputPath))) {
                                    fs.mkdirSync(docOutputPath);
                                }
                                if (!fs.existsSync(path.join(docApiDocPath))) {
                                    fs.mkdirSync(docApiDocPath);
                                }
                                Context_1.default.generateInfo({
                                    description: doc.info.description,
                                    version: doc.info.version,
                                    title: doc.info.title
                                });
                                Context_1.default.generateModule(doc.definitions);
                                Context_1.default.generatePaths(doc.paths);
                                docContent = Context_1.default.getContext();
                                fs.writeFileSync(path.join(process.cwd(), name + ".json"), JSON.stringify(docContent, null, 2), { encoding: 'utf8' });
                                return [4 /*yield*/, generateDoc_1.generateDoc(docContent)];
                            case 1:
                                docCode = _a.sent();
                                fs.writeFileSync(path.join(docOutputPath, 'apidoc.js'), docCode.join(''), { encoding: 'utf8' });
                                child_process_1.execSync(path.join(__dirname, '../../../node_modules', 'apidoc', 'bin', 'apidoc') + " -i ./dist/" + name + " -o apidoc/" + name);
                                docBiscConfig = config.configs.find(function (item) { return item.name === name; });
                                fs.writeFileSync(path.join(docApiDocPath, 'apidoc.json'), JSON.stringify({
                                    name: name,
                                    version: doc.info.version + ".1" || docBiscConfig.version,
                                    description: docBiscConfig.description || name,
                                    title: docBiscConfig.title || name,
                                    url: "http://www.apidoc-admin.com/",
                                }, null, 2), { encoding: 'utf8' });
                                if (index === 0) {
                                    spinner.stop();
                                    process.exit(0);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            return [2 /*return*/];
        });
    });
}
function docToApiDoc(config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function getDoc(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, json, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url + "/swagger-ui-init.js")];
                case 1:
                    res = _a.sent();
                    json = res.data.match(/var options = ({\s+"swaggerDoc"[\s\S]+});\s+url = options.swaggerUrl/m);
                    if (!json || !json[1]) {
                        console.log('文档解析失败');
                        process.exit(1);
                    }
                    config = JSON.parse(json[1]);
                    if (!config) {
                        console.info('文档读取失败');
                        process.exit(1);
                    }
                    return [2 /*return*/, config.swaggerDoc];
            }
        });
    });
}
