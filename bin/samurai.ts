#!/usr/bin/env node
import { CommanderStatic } from 'commander';
import commander from 'commander';
import { CommandLoader } from '../src/lib/command/command.loader';

export function main() {
  const program: CommanderStatic = commander;

  program.version(require('../package.json').version)
    .usage('<command> [options]');
  CommandLoader.load(program);
  commander.parse(process.argv);
  if (!program.args.length) {
    program.outputHelp();
  }
};

main()

