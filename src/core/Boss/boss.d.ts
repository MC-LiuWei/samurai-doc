import { Task } from './interface';
declare class Boss {
    constructor();
    /** BOSS中的工作线程，多实例共享 **/
    private static works;
    private static isInit;
    private taskWorkers;
    private createWorks;
    private init;
    /**
     * 插入任务
     * @param task 待处理任务信息
     */
    queue(task: Task): void;
    kill(pid: number): void;
    reset(): void;
}
declare const _default: Boss;
export default _default;
//# sourceMappingURL=boss.d.ts.map