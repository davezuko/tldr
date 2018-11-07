const { argv } = require("yargs");
const TLDR = require("../index");

const tldr = TLDR.init(argv);
const topic = argv._[0] || "index";
tldr.printTopic(topic);
