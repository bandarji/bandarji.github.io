---
layout: post
title: "Advent of Code 2015-2024: A Go and Rust Learning Journey"
date: 2025-08-27
categories: [coding, algorithms, go, rust, advent-of-code]
excerpt: "I intend to solve all Advent of Code puzzles from 2015 to 2024 in Go and Rust."
---

# Advent of Code 2015-2024

I learned about Advent of Code back in 2020. That year, I earned 19 stars
writing solutions in Python. At this point, I have the following stats:

| Year | Stars | Notes |
| :--- | :--- | :--- |
| 2024 | 33 | Go |
| 2023 | 47 | Go |
| 2022 | 25 | Go, Rust and Python |
| 2021 | 23 | Go and Python |
| 2020 | 19 | Python - first year to join |
| 2019 |  2 | C - wrote solution in 2020 |
| 2018 |  0 | Did not participate |
| 2017 |  0 | Did not participate |
| 2016 | 23 | Go - written years later |
| 2015 | 20 | Go, Rust and Python - written years later |

Now, I plan to write solutions for all years' puzzles, to reinforce my
understanding of algorithms and programming approaches. Part of the challenge
will focus on language mechanics, as I intend to apply engineering best
practices to writing and testing solutions in Go, then Rust.

Throughout this adventure, I intend to remain mindful of the following:

- **Modularity**: Write easy-to-follow code, split into manageable functions.
- **Test Coverage**: One cannot validate what they do not test.
- **Performance**: Explore alternative approaches for "slow code".
- **Structure**: Maintain separation of concerns.
- **Idiomatic**: Make Gophers and Rustaceans proud.

## Phase One: Go, Go, Go

I have a comfort level with Go and I plan to work with well-known patterns
for validating code through tests. The Makefile accepts `make test` and output
for one day's solutions looks like so:

```
github.com/bandarji/aoc/adventofcode/y15d05.go:22:	y15d05				100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:32:	y15d05NiceString		100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:45:	y15d05HasSpacedRepeat		100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:54:	y15d05HasTwoTwice		100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:66:	y15d05HasBadCombos		100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:78:	y15d05HasCharTwiceTogether	100.0%
github.com/bandarji/aoc/adventofcode/y15d05.go:87:	y15d05HasThreeVowels		100.0%
```

## Phase Two: Get Rusty

I wrote some 2022 solutions using Rust, to better familiarize myself with the
language. This helped me contribute to a Rust-based project at work and I
enjoyed learning something new and different. Since that time, no work
opportunities have surfaced for me to expand my know-how.

## Documentation and Sharing

[Blog posts](https://bandarji.github.io/coding/) will detail my journey. I have
a [Github repository](https://github.com/bandarji/aoc) to house all solutions.
