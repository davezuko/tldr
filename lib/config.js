const path = require("path");

const DEFAULT_CONFIG = {
  topics: path.resolve(process.cwd(), "docs/tldr")
};

function init(overrides) {
  return Object.assign({}, DEFAULT_CONFIG, overrides);
}

module.exports = { init };
