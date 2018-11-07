const path = require("path");

const DEFAULT_CONFIG = {
  root: path.resolve(process.cwd(), "tldr")
};

function init(overrides) {
  return Object.assign({}, DEFAULT_CONFIG, overrides);
}

module.exports = { init };
