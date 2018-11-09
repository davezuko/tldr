const FS = require("./lib/fs");
const config = require("./lib/config");
const parser = require("./lib/parser");
const printer = require("./lib/printer");

class TLDR {
  constructor(opts) {
    this._config = config.init(opts);
    this._fs = new FS(this._config.topics);
  }

  printIndex() {
    const record = parser.parseMarkdown(this._fs.readIndex());
    printer.printIndex(record, this.listTopics());
  }

  printTopic(topic) {
    if (!this.topicExists(topic)) {
      printer.printTopicNotFound(topic, this.listTopics());
      return;
    }
    const record = parser.parseMarkdown(this._fs.readTopic(topic));
    printer.printTopic(record);
  }

  topicExists(topic) {
    return this._fs.topicExists(topic);
  }

  listTopics() {
    return this._fs.listTopics();
  }
}

module.exports = TLDR;
