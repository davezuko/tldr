const fs = require("fs");
const path = require("path");

class FileSystem {
  constructor(root) {
    this._root = root || process.cwd();
  }

  path(...args) {
    return path.resolve(this._root, ...args);
  }

  listTopics() {
    return fs.readdirSync(this.path());
  }

  readTopic(topic) {
    return fs.readFileSync(this.path(topic + ".md"), "utf8");
  }

  topicExists(topic) {
    return fs.existsSync(this.path(topic + ".md"));
  }
}

module.exports = FileSystem;
