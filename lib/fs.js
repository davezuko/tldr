const fs = require('fs')
const path = require('path')

class FileSystem {
  constructor(config) {
    this._config = config
    this._cacheTopics()
  }

  path(...args) {
    return path.resolve(this._config.root, ...args)
  }

  _cacheTopics() {
    this.__cachedTopics = this.listTopics()
  }

  listTopics() {
    if (this.__cachedTopics) {
      return this.__cachedTopics
    }

    const {topics} = this._config
    if (!fs.existsSync(topics)) {
      return []
    }

    return fs
      .readdirSync(topics)
      .map(file => file.replace('.md', ''))
      .filter(topic => topic !== 'index')
  }

  createIndex() {
    let pkg
    try {
      pkg = require(this.path('package.json'))
    } catch (e) {
      pkg = {
        name: 'Your Project Name',
        description: 'Your project description',
      }
    }

    fs.writeFileSync(
      'TLDR.md',
      [
        `# ${pkg.name}`,
        '',
        `> ${pkg.description}`,
        '',
        ' - Start the project',
        '`npm start`',
      ].join('\n')
    )
  }

  readIndex() {
    for (const file of ['TLDR.md', 'tldr.md']) {
      if (fs.existsSync(this.path(file))) {
        return fs.readFileSync(this.path(file), 'utf8')
      }
    }
  }

  readTopic(topic) {
    if (this.topicExists(topic)) {
      return fs.readFileSync(
        this.path(this._config.topics, topic + '.md'),
        'utf8'
      )
    }
  }

  inferIndex() {
    const pkg = require(this.path('package.json'))
    const topic = {
      title: pkg.name,
      description: pkg.description,
      examples: [],
    }

    for (const file of [
      'README.md',
      'README.txt',
      'README',
      'readme.md',
      'readme.txt',
      'readme',
    ]) {
      if (fs.existsSync(this.path(file))) {
        topic.content = fs.readFileSync(this.path(file), 'utf8')
        break
      }
    }
    return topic
  }

  topicExists(topic) {
    return this.listTopics().includes(topic)
  }
}

module.exports = FileSystem
