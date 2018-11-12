const fs = require("fs");
const path = require("path");

class FileSystem {
  constructor(topicsPath) {
    this._topicsPath = topicsPath || process.cwd();
    this._cacheTopics();
  }

  path(...args) {
    return path.resolve(this._topicsPath, ...args);
  }

  _cacheTopics() {
    this._topics = this.listTopics();
  }

  listTopics() {
    if (this._topics) {
      return this._topics;
    }
    if (!fs.existsSync(this.path())) {
      return [];
    }

    return fs
      .readdirSync(this.path())
      .map(file => file.replace(".md", ""))
      .filter(topic => topic !== "index");
  }

  createIndex() {
    let pkg;
    try {
      pkg = require(path.resolve(process.cwd(), "package.json"));
    } catch (e) {
      /* ignore */
    }
    pkg = Object.assign(
      {
        name: "Your Project Name",
        description: "Your project description"
      },
      pkg
    );

    fs.writeFileSync(
      "TLDR.md",
      [
        `# ${pkg.name}`,
        "",
        `> ${pkg.description}`,
        "",
        " - Start the project",
        "`npm start`"
      ].join("\n")
    );
  }

  readIndex() {
    if (fs.existsSync("tldr.md")) {
      return fs.readFileSync("tldr.md", "utf8");
    } else if (fs.existsSync("TLDR.md")) {
      return fs.readFileSync("TLDR.md", "utf8");
    }
  }

  readTopic(topic) {
    if (this.topicExists(topic)) {
      return fs.readFileSync(this.path(topic + ".md"), "utf8");
    }
  }

  topicExists(topic) {
    return this.listTopics().includes(topic);
  }
}

module.exports = FileSystem;
