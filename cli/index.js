const { argv } = require("yargs");
const TLDR = require("../lib/index");

const tldr = new TLDR(argv);
const patterns = argv._;

if (patterns.length) {
  patterns.forEach(pattern => tldr.printMatchingTopics(pattern));
} else {
  tldr.printIndex();
}
