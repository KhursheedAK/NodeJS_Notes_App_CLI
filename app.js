import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import notes from './notes.js';
// const argv = yargs(hideBin(process.argv)).parse();

/* yargs parser */
const argv = yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'add a note',
    builder: {
      title: {
        describe: 'note title',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'note body',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      return notes.addNote(argv.title, argv.body);
    },
  })
  .command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
      title: {
        describe: 'note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      return notes.removeNote(argv.title);
    },
  })
  .command({
    command: 'read',
    describe: 'read note',
    buidler: {
      title: {
        describe: 'note title',
        type: 'string',
        demandOption: true,
      },
      body: {
        describe: 'note body',
        type: 'string',
      },
    },
    handler(argv) {
      return notes.readNote(argv.title);
    },
  })
  .command({
    command: 'list',
    describe: 'list notes',
    builder: {
      title: {
        describe: 'notes title',
        type: 'string',
      },
    },
    handler() {
      return notes.listNote();
    },
  })
  .parse();
