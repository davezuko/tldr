const FS = require("./lib/fs");
const config = require("./lib/config");
const parser = require("./lib/parser");
const printer = require("./lib/printer");

class TLDR {
  constructor(opts) {
    this._config = config.init(opts);
    this._fs = new FS(this._config.root);
  }

  _assertTopicExists(topic) {
    if (!this._fs.topicExists(topic)) {
      throw new Error(
        `Could not find a markdown document for the topic: "${topic}"`
      );
    }
  }

  suggestTopics() {
    return this._fs.listTopics();
  }

  printTopic(topic) {
    this._assertTopicExists(topic);
    const record = parser.parseMarkdown(this._fs.readTopic(topic));
    printer.printTopic(record);
  }
}

function init(config) {
  return new TLDR(config);
}

module.exports = { init };
