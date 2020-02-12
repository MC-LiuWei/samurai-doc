import boss from '../Boss/boss';
import { Paths } from '../Content/paths';
import { Schemas } from '../Content/swagger';

export async function generateDoc(path: Paths[], _modules: Schemas[]) {
  const tasks: Array<Promise<void>> = [];
  path.forEach((item) => {
    tasks.push(new Promise((res) => {
      boss.queue({
        message: item,
        modules: _modules,
        callback: (message: any) => {
          res(message);
        }
      });
    }))
  });
  return Promise.all(tasks)
}