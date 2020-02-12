"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var child_process_1 = require("child_process");
var path_1 = require("path");
/** 可用cpu数 **/
var cpus = os.cpus().length - 1;
var Boss = /** @class */ (function () {
    function Boss() {
        this.taskWorkers = [];
        this.createWorks();
    }
    Boss.prototype.createWorks = function () {
        if (Boss.isInit) {
            return;
        }
        while (Boss.works.length < cpus) {
            var worker = child_process_1.fork(path_1.join(__dirname, './worker.js'));
            Boss.works.push(worker);
        }
        Boss.isInit = true;
    };
    Boss.prototype.init = function (task) {
        var _this = this;
        this.createWorks();
        var worker = Boss.works.pop();
        var callback = task.callback, params = __rest(task, ["callback"]);
        worker.send(params);
        worker.once('message', function (messsage) {
            callback(messsage);
            Boss.works.push(worker);
            if (_this.taskWorkers.length > 0) {
                _this.init(_this.taskWorkers.pop());
            }
        });
    };
    /**
     * 插入任务
     * @param task 待处理任务信息
     */
    Boss.prototype.queue = function (task) {
        if (Boss.works.length <= 0) {
            this.taskWorkers.push(task);
            return;
        }
        this.init(task);
    };
    Boss.prototype.kill = function (pid) {
        if (pid || pid === 0) {
            Boss.works.find(function (worker) { return worker.pid === pid; }).kill();
            return;
        }
        Boss.works.forEach(function (worker) {
            worker.kill();
        });
        return;
    };
    Boss.prototype.reset = function () {
        Boss.works = [];
        Boss.isInit = false;
    };
    /** BOSS中的工作线程，多实例共享 **/
    Boss.works = [];
    Boss.isInit = false;
    return Boss;
}());
exports.default = new Boss();
