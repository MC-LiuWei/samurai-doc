export interface Task {
  callback: (message: any) => void;
  name: string
}