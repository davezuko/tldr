function parseMarkdown(content) {
  const topic = {
    title: null,
    description: null,
    examples: []
  };

  let lines = content.split("\n");
  if (/^#/.test(lines[0])) {
    topic.title = lines.shift().replace(/#\s*/, "");
    lines.shift();
    topic.description = lines.shift().replace("> ", "");
  }

  topic.examples = lines
    .join("\n")
    .split(/[\^\n]*\- /g)
    .filter(Boolean)
    .map(str => {
      const [title, example = ""] = str.split("\n\n");
      return {
        title: title.trim().replace(/\n/g, ""),
        example: example.trim().replace(/[`\n]/g, "")
      };
    });
  return topic;
}

module.exports = { parseMarkdown };
