const cp = require('child_process')
const path = require('path')
const FS = require('./fs')
const config = require('./config')
const parser = require('./parser')
const printer = require('./printer')

class TLDR {
  constructor(opts) {
    const cfg = config.init(opts)
    this._fs = new FS(config.init(opts))
  }

  findTopics(pattern) {
    const regex = new RegExp('^' + pattern.replace(/\*/, '.*'), 'i')
    return this.list().filter(topic => regex.test(topic))
  }

  printIndex() {
    const index = this._fs.readIndex()

    // index was found, print it and return
    if (index) {
      const topic = parser.parseMarkdown(index)
      printer.printIndex(topic, this.list())
      return
    }

    // no index page was found, try to infer one
    const topic = this._fs.inferIndex()
    printer.printTopic(topic)
    printer.print(topic.content)
  }

  printTopic(topic) {
    if (!this._fs.topicExists(topic)) {
      printer.printTopicNotFound(topic, this.list())
      return
    }
    const record = parser.parseMarkdown(this._fs.readTopic(topic))
    printer.printTopic(record)
  }

  printTopics(pattern) {
    const topics = this.findTopics(pattern)
    if (topics.length) {
      topics.forEach(topic => this.printTopic(topic))
    } else {
      printer.printTopicNotFound(pattern, this.list())
    }
  }

  printExternalTLDR(external, patterns) {
    const tldr = new TLDR({
      root: path.isAbsolute(external)
        ? external
        : path.resolve(
            require.resolve(external + '/package.json', {
              paths: [path.resolve(process.cwd(), 'node_modules')],
            }),
            '..'
          ),
    })
    if (!patterns.length) {
      tldr.printIndex()
    } else {
      patterns.forEach(pattern => tldr.printTopics(pattern))
    }
  }

  init() {
    if (!this._fs.readIndex()) {
      this._fs.createIndex()
    }
  }

  list() {
    return this._fs.listTopics()
  }
}

module.exports = TLDR
