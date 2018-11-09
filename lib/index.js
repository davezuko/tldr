const FS = require("./fs");
const config = require("./config");
const parser = require("./parser");
const printer = require("./printer");

class TLDR {
  constructor(opts) {
    this._config = config.init(opts);
    this._fs = new FS(this._config.topics);
  }

  findTopics(pattern) {
    const topics = this._fs.listTopics();
    const regex = new RegExp("^" + pattern.replace(/\*/, ".*"), "i");
    return topics.filter(topic => regex.test(topic));
  }

  printMatchingTopics(pattern) {
    const topics = this.findTopics(pattern);
    if (topics.length) {
      topics.forEach(topic => this.printTopic(topic));
    } else {
      printer.printTopicNotFound(pattern, this.listTopics());
    }
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
