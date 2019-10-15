import { Task } from '../Boss/interface';

export function parseDocObject(task: Task): string {
  console.log('任务', task);
  return '{ "di": 1}';
}
