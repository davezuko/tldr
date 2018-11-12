# TL;DR

Easily manage TL;DR pages for your project to help users figure out what scripts and processes are available. These pages act as quick reference manuals that supplement richer documentation.

## Installation

```sh
yarn add --dev @packit/tldr       # yarn users
npm install --dev @packit/tldr    # npm users

# create your first TL;DR document:
npx tldr init!

```
Additionally, you can optionally create `{{topic}}.md` files in `docs/tldr`.

## Usage

> yarn users can replace `npx` with `yarn`, if preferred.

```sh
npx tldr            # display the content of tldr.md
npx tldr {{topic}}  # display topic from ./docs/tldr/{{topic}}.md

# display multiple topics:
npx tldr {{topic1}} {{topic2}} {{topic3}}

# display all topics:
npx tldr "*"

# display topics matching pattern:
npx tldr "build*"
```

## Prior Art

Inspired by https://tldr.sh
