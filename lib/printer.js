const chalk = require("chalk");

function print(message, ...args) {
  message = message.replace(/\n/g, "\n  ");
  console.log(`  ${message}`, ...args);
}

function printLine() {
  console.log();
}

function printIndex(topic, availableTopics) {
  if (availableTopics.length) {
    printLine();
    print(
      chalk.cyan(
        `Tip: run ${chalk.bold(
          "yarn tldr {{topic}}"
        )} for more detailed examples`
      )
    );
    print(chalk.cyan(`Available topics: ${availableTopics.join(", ")}`));
  }
  printTopic(topic);
}

function printTopic(topic) {
  const { title, description, examples } = topic;

  printLine();
  if (title) {
    print(title);
    if (description) {
      print(chalk.gray(description));
    }
    printLine();
  }
  examples.forEach(({ title, snippets }) => {
    print(`— ${chalk.green(title)}`);
    snippets.forEach(snippet => print(snippet));
    printLine();
  });
}

function printTopicNotFound(topic, availableTopics) {
  printLine();
  print(chalk.red(`Could not find a document for the topic "${topic}".`));
  if (availableTopics.length) {
    print("Did you mean one of these?");
    printLine();
    print(availableTopics.map(topic => `  - ${topic}`).join("\n"));
    printLine();
  } else {
    // TODO: explain how to create topics
  }
}

module.exports = { printIndex, printTopic, printTopicNotFound };
