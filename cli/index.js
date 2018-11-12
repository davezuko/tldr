const {argv} = require('yargs')
const TLDR = require('../lib/index')

const tldr = new TLDR(argv)
const [command] = argv._

// Handle meta commands (e.g. init!, list!)
if (/\?$/.test(command)) {
  tldr.printExternalTLDR(command.replace('?', ''), argv._.slice(1))
  process.exit(0)
}

// Handle search commands (e.g. lodash?)
if (/\!$/.test(command)) {
  const method = command.replace('!', '')
  switch (command) {
    case 'init!':
      tldr.init()
      break
    case 'list!':
      console.log(tldr.list().join('\n'))
      break
  }
  process.exit(0)
}

const patterns = argv._
if (patterns.length) {
  patterns.forEach(pattern => tldr.printTopics(pattern))
} else {
  tldr.printIndex()
}
