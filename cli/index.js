const { argv } = require("yargs");
const TLDR = require("../lib/index");

const tldr = new TLDR(argv);

switch (argv._[0]) {
  case "init!":
    tldr.init();
    break;
  default:
    const patterns = argv._;
    if (patterns.length) {
      patterns.forEach(pattern => tldr.printTopics(pattern));
    } else {
      tldr.printIndex();
    }
}
