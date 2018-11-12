const path = require('path')

const DEFAULT_CONFIG = {
  root: process.cwd(),
}

function init(overrides) {
  const config = Object.assign({}, DEFAULT_CONFIG, overrides)
  if (!config.topics) {
    config.topics = path.resolve(config.root, 'docs/tldr')
  }
  return config
}

module.exports = {init}
