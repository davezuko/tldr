function matchAll(str, regex) {
  const matches = [];
  let match;
  while ((match = regex.exec(str))) {
    matches.push(match[1]);
  }
  return matches;
}

function parseMarkdown(content) {
  function parseTitle() {
    const match = content.match(/^#\s*(.*)$/m);
    return match ? match[1] : "";
  }

  function parseDescription() {
    return matchAll(content, /^\s*>\s*(.*)$/gm).join("\n");
  }

  function parseExamples() {
    const [__, ...groups] = content.split(/^\s*[-*]/gm);
    return groups.map(group => {
      const [title, ...snippets] = group.split("\n");
      return {
        title: title.trim(),
        snippets: snippets
          .map(str => str.replace(/(^\s*`|`$)/g, "").trim())
          .filter(Boolean)
      };
    });
  }

  return {
    title: parseTitle(),
    description: parseDescription(),
    examples: parseExamples()
  };
}

module.exports = { parseMarkdown };
