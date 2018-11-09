const { argv } = require("yargs");
const TLDR = require("../index");

const tldr = new TLDR(argv);
const [topic] = argv._;

if (topic) {
  tldr.printTopic(topic);
} else {
  tldr.printIndex();
}
