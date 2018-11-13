# TL;DR

Easily create and manage TL;DR pages to help users find their way around your project. These pages are designed to supplement, not replace, richer documentation, and should act as a quick reference manual for common tasks.

See an example [here](./docs/example-screenshot.png).

## Installation

```sh
yarn add --dev @packit/tldr       # yarn users
npm install --dev @packit/tldr    # npm users

# create your first TL;DR document:
npx tldr init!

```

Additionally, you can optionally create `{{topic}}.md` files in `docs/tldr`.

> These topics can be displayed by running `npx tldr {{topic}}`. See [usage](#usage) for more.

## Usage

> yarn users can replace `npx` with `yarn`, if desired.

```sh
npx tldr              # display the content of tldr.md
npx tldr {{topic}}    # display topic from ./docs/tldr/{{topic}}.md

# display multiple topics:
npx tldr {{topic1}} {{topic2}} {{topic3}}

# display all topics:
npx tldr "*"

# display topics matching pattern:
npx tldr "build*"

# display TL;DR page for an external package:
npx tldr jest?        # reads from node_modules

# search all topics:
npx tldr "*" | grep "pattern" -A 1 -B 1
```

## Meta Commands

> All meta commands are suffixed with `!`.

```sh
npx tldr init!   # initialize a TLDR.md file for your project
npx tldr list!   # list available topics (found in docs/tldr)
```

## Options

```sh
npx tldr --root /some/path/here    # run tldr in another directory
```

## Prior Art

Inspired by https://tldr.sh
