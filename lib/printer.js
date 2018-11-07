const chalk = require("chalk");

function printTopic(topic) {
  const { title, description, examples } = topic;

  if (title) {
    console.log(`  ${title}`);
    console.log(chalk.gray(`  ${description}`));
    console.log();
  }
  examples.forEach(({ title, example }) => {
    console.log(`  — ${chalk.green(title)}`);
    console.log(`    ${example}`);
    console.log();
  });
}

module.exports = { printTopic };
