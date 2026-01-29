---
layout: post
title: "Advent of Code 2015 Day 09: Permutations"
date: 2025-09-01
categories: [coding]
excerpt: "Go does not have a permutations function in the standard library, so I had to look up algorithms."
---

# Permutations A No-Go With Go

No permutations function exists in Go's standard library. At least, as far as I
know. I looked up a package to import that would do the trick, but I also took
a peek at an algorithm to implement.

## Importing The Permute Package

First, let us take a look at a package to import. Several exist, but I like
this one because it builds permutations for a slice containing elements of
any type.

```go
package main

import (
	"fmt"

	"github.com/cespare/permute"
)

type ByteSlice []byte

func (s ByteSlice) Len() int      { return len(s) }
func (s ByteSlice) Swap(i, j int) { s[i], s[j] = s[j], s[i] }

func main() {
	b := []byte{'A', 'B', 'C'}
	p := permute.New(ByteSlice(b))
	for p.Permute() {
		fmt.Println(string(b))
	}
}
```

To satisfy the interface, simply add `Len()` and `Swap()` methods.

## Implementing Heap's Algorithm

For my Advent of Code journey, I implemented
[Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm).

**My Implementation**

```go
package main

import "fmt"

func main() {
	collection := []string{"a", "b", "c"}
	permutations := [][]string{}
	permute(collection, len(collection), &permutations)
	for i, perm := range permutations {
		fmt.Printf("%05d: %s\n", i+1, perm)
	}
}

func permute(sequence []string, k int, response *[][]string) {
	if k == 1 {
		*response = append(*response, append([]string{}, sequence...))
	} else {
		for i := 0; i < k; i++ {
			permute(sequence, k-1, response)
			if k%2 == 0 {
				sequence[i], sequence[k-1] = sequence[k-1], sequence[i]
			} else {
				sequence[0], sequence[k-1] = sequence[k-1], sequence[0]
			}
		}
	}
}
```

A quick-glance test: the value in the output should be the factorial amount
of the length of the sequence. So, a slice of three strings would return six
permutations. A slice of five, 120.

![](https://komarev.com/ghpvc/?username=bandarji&label=VIEWS)
