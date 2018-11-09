const fs = require("fs");
const path = require("path");

class FileSystem {
  constructor(topicsPath) {
    this._topicsPath = topicsPath || process.cwd();
  }

  path(...args) {
    return path.resolve(this._topicsPath, ...args);
  }

  listTopics() {
    if (!fs.existsSync(this.path())) {
      return [];
    }

    return fs
      .readdirSync(this.path())
      .map(file => file.replace(".md", ""))
      .filter(topic => topic !== "index");
  }

  readIndex() {
    if (fs.existsSync("tldr.md")) {
      return fs.readFileSync("tldr.md", "utf8");
    }
  }

  readTopic(topic) {
    if (this.topicExists(topic)) {
      return fs.readFileSync(this.path(topic + ".md"), "utf8");
    }
  }

  topicExists(topic) {
    return fs.existsSync(this.path(topic + ".md"));
  }
}

module.exports = FileSystem;
