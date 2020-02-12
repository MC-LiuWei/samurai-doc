import { ContextObj } from '../Context/interface';
import boss from '../Boss/boss';
import Context from '../Context';

export async function generateDoc(context: ContextObj) {
  const paths = context.Paths;
  const tasks: Array<Promise<void>> = [];
  paths.forEach((item) => {
    tasks.push(new Promise((res) => {
      boss.queue({
        message: item,
        info: Context.getInfo(),
        modules: Context.getModule(),
        callback: (message: any) => {
          res(message);
        }
      });
    }))
  });
  return Promise.all(tasks)
}