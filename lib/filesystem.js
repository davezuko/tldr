const fs = require("fs");
const parser = require("./parser");
const printer = require("./printer");

function init(tldrFolder, opts) {
  const topics = fs.readdirSync(tldrFolder);
}

module.exports = { init };
