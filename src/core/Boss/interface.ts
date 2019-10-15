import { Paths, Modules, Info } from '../Context/interface';
export interface Task {
  callback: (message: any) => void;
  message: Paths;
  modules: Modules[];
  info: Info;
}