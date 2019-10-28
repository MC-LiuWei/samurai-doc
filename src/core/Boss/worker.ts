import { Task } from './interface';
import { parseDocObject } from '../document/parse';

process.on('message', function (task: Task) {
  const doc: string = parseDocObject(task);
  process.send(doc);
});