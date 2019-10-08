import * as os from 'os';
import { fork, ChildProcess } from 'child_process';
import { Task } from './interface';
import { join } from 'path';

/** 可用cpu数 **/
const cpus = os.cpus().length - 1;


class Boss {
  /** BOSS中的工作线程，多实例共享 **/
  private static works: Array<ChildProcess> = [];
  private static isInit: boolean = false;
  private taskWorkers: Array<Task> = [];
  private createWorks() {
    if (Boss.isInit) {
      return;
    }
    while (Boss.works.length < cpus) {
      const worker: ChildProcess = fork(join(__dirname, './worker.js'));
      Boss.works.push(worker);
    }
    Boss.isInit = true;
  }

  private init(task: Task | any) {
    this.createWorks();
    const worker: ChildProcess | any = Boss.works.pop();
    const { callback, ...params } = task;
    worker.send(task);
    worker.once('message', (messsage: string) => {
      const msg = JSON.parse(messsage);
      callback(msg);
      Boss.works.push(worker);
      if (this.taskWorkers.length > 0) {
        this.init(this.taskWorkers.pop());
      }
    })
  }

  /**
   * 插入任务
   * @param task 待处理任务信息
   */
  public queue(task: Task) {
    if (Boss.works.length <= 0) {
      this.taskWorkers.push(task);
      return;
    }
    this.init(task);
  }

  public kill(pid: number) {
    if (pid || pid === 0) {
      Boss.works.find((worker) => worker.pid === pid)!.kill();
      return;
    }
    Boss.works.forEach((worker) => {
      worker.kill();
    });
    return;
  }

  public reset() {
    Boss.works = [];
    Boss.isInit = false;
  }
}