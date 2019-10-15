import { Task } from './interface';
import { parseDocObject } from '../generateDoc/docDataLoader';

process.on('message', function (task: Task) {
  const doc: string = parseDocObject(task);
  process.send(doc);
});