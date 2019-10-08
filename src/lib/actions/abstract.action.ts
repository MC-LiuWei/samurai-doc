import { Input } from "../command/command.input";


export abstract class AbstractAction {
  public abstract async handle(params: Input[]): Promise<void>
}