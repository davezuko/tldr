# TL;DR

> Utility to help you effortlessly manage and search for TL;DR pages

- display the content of TLDR.md

`npx tldr`

- display multiple topics:

`npx tldr {{topic1}} {{topic2}} {{topic3}}`

- display all topics:

`npx tldr "*"`

- display topics matching pattern:

`npx tldr "build*"`

- display TL;DR page for an external package:

`npx tldr jest?`

- search all topics:

`npx tldr "*" | grep "pattern" -A 1 -B 1`
