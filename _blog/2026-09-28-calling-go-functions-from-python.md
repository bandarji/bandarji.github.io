---
layout: post
title: "Calling Go Functions From Python"
date: 2026-09-28
categories: [coding]
excerpt: "Write in Go; use from Python."
---

![Opening Presentation Slide][s1]

On September 28, I gave a lightning talk at [/dev/reno][dr] about calling Go
functions from Python. While I used Google Slides for the presentation, the
slide content remained text (except the QR code on the final slide).

# Calling Go From Python

This demonstrates how the slide content remained text-based.

<div class="slide" markdown="1">

~~~text
 ╠══[ Calling Go From Python :: Compile A Shared Library ]════════════════════════════════════════════════════════════════════════════════╣


                      _=gj88888888lkoz=,_
                    D888888888888888888888b,                                                  ##########
                  j88P""V8888888888888888888                                                ##############
                  888    8888888888888888888                                               ####        ####
                  888baed8888888888888888888                                              ####
                                8888888888888                                             ####
        ,ad8888888888888888888888888888888888  888888be,                                  ####
      d8888888888888888888888888888888888888  888888888b,                                 ####
      d88888888888888888888888888888888888888  8888888888b,                                ####        ####
    j888888888888888888888888888888888888888  88888888888p,                                 ##############
    j888888888888888888888888888888888888888'  8888888888888                                  ##########
    8888888888888888888888888888888888888^"   ,8888888888888
    88888888888888^'                        .d88888888888888
    8888888888888"   .a8888888888888888888888888888888888888
    8888888888888  ,888888888888888888888888888888888888888^                      ,_---~~~~~----._         
    ^888888888888  888888888888888888888888888888888888888^                _,,_,*^____      _____``*g*\"*, 
    V88888888888  88888888888888888888888888888888888888Y                / __/ /'     ^.  /      \ ^@q   f 
      V8888888888  88888888888888888888888888888888888^"'                [  @f | @))    |  | @))   l  0 _/  
      ´"^8888888  8888888888888                                          \`/   \~____ / __ \_____/    \   
                  8888888888888888888888888                               |           _l__l_           I   
                  8888888888888888888P""V88                               }          [______]           I  
                  8888888888888888888    88                               ]            | | |            |  
                  8888888888888888888baed88                               ]             ~ ~             |  
                    ´^88888888888888888888^                                |                            |   
                      ´'"^=V888888888V=^'´                                  |                           |   



 ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
~~~

</div>

## Important Links

- The Github repository, [bandarji/import-go-from-python][repo], contains all
the proof of concept source code.
- That repository also contains the actual [slide source][slidemd].
- The [README][readme] explains all the content, in detail.
- You can also view the [actual presentation][presentation] slide deck.

The lightning talk discusses a proof of concept for calling functions written
in Go from Python. Python can load a compiled shared library with
[`ctypes`][ctypes], calling the functions exported from Go.

I used [uv][wwwuv] v0.12 for the virtual environment and packages, Python
v3.14.7, [Go][wwwgo] to compile, and [Git][wwwgit] for the repository.
[Docker][wwwdocker] v29.6.2 ran the Linux build.

# How To Compile A Shared Library

![][s3]

Within the Go package `cgotopypoc`, C code sits in a comment block, called the
CGO preamble, immediately before `import "C"`. The `go build` command from the
slide demonstrates how to compile the shared library. That library's file
extension depends on the operating system: `so` for Linux, `dylib` for Mac OS
and `dll` for Windows.

```bash
cd cgotopypoc
CGO_ENABLED=1 go build -buildmode=c-shared -o libcgotopypoc.so .
```

# Go And Python Example Code

The CGO preamble, C code that sits as Go comments just before the
`import "C"` line, prepares the shared library. If exports pass a void
pointer to CGO, to cover Python's `None` type, the Go code requires
`import "unsafe"`.

On the Python side, `ctypes.CDLL` loads the shared library and each exported
name is a callable. In this repository, `cgotopypoc.py` runs the build, loads
the result and sets `restype` on each export before any assertion runs.

References:

- [Command CGO][ccgo]
- [C references to Go][pycgo]

## Repository Layout

```
cgotopypoc/
  go.mod                # Go module
  returns.go            # CGO exports for each compatible Python return type
  record.go             # Go Record struct and its CGO exports
gonpypoc/
  pyproject.toml        # project metadata and build backend
  uv.lock               # locked dependency set
  .python-version       # pinned interpreter (v3.14)
  src/gonpypoc/
    __init__.py         # package entry; runs the CGO assertions
    cgotopypoc.py       # builds, loads and asserts the shared library
  tests/
    conftest.py         # shared pytest fixture that loads the CGO library
    test_cgotopypoc.py  # Unit tests (pytest)
    test_go_returns.py  # Unit tests (pytest)
```

A unit testing dependency, [pytest][wwwpytest], installed by uv, checks the
Go function responses. Access with `make docker-test`.

# Supported Data Types

![][s4]

This slide displays many supported data types as values flow from Go to
Python, crossing the C ABI.

- Complex numbers travel as a small C struct of two doubles.
Python rebuilds the value with `complex(real, imag)`.
- Strings and byte slices come back as `char*`. Python copies the bytes, then
calls `FreeCString` so the C allocation does not linger. The Unicode check
returns `बंदरजी` (bandarji, written in Hindi).
- `Record` represents a struct. CGO will not put a Go struct in an `//export`
signature (`Go type not supported in export: struct`), so `record.go` copies
`Record` to and from `CRecord`, a C struct with the same field order and
sizes. Python declares that layout as a `ctypes.Structure` named `CRecord`
and reads the value as a `Record` named tuple.

Go's garbage collector does not track memory handed to CGO. Pointers can
cause issues here, as memory reclamation can occur. The [gopy][gopy] tool
addresses this by replacing pointers with `int64` values, to reserve
memory untouchable by garbage collection.

# CGO vs gopy

![][s5]

CGO ships with Go. Python reaches it through a shared library and ctypes.
Strings cross with `C.CString`. Structs are copied through a C struct.
Slices and maps have no C equivalent, so this design keeps them on the Go
side. Objects cross as C values and pointers. The `go build` command
compiles the shared library.

Not part of the standard Go installation, [gopy][gopy] generates extension
modules using the `gopy` build tool. This aligns Go function responses more
closely with Python. Strings arrive as `str`. Structs come in as Python
classes with fields and methods. Slices and maps have wrappers for Python
compatibility. Go's garbage collector does not reclaim memory, as pointers
become `int64` handles.

The shared library fits a small surface of numbers, strings, bytes, and
plain structs. gopy fits a Go API made of slices, maps, and pointers.

The warning under the table is the part I want to keep. One Go repository,
called from several languages, has real appeal. That appeal still has to
survive the C boundary. Just because the shared library builds does not mean
every Go API belongs on it.

# Global Interpreter Lock

![][s6]

Python's global interpreter lock (GIL) ensures that only one thread executes
at a time. Python releases the GIL for the ctypes call into Go. Python threads
sitting inside that call run at the same time, and the interpreter waits until
they return.

Inside the Go function, new goroutines belong to the Go scheduler. The
scheduler spreads them across an OS thread pool capped by `GOMAXPROCS`.

Each Python thread that enters Go is also tracked by Go: one OS thread per
Python thread, in addition to Go's own pool. Those OS threads cost more
memory than goroutines. In my humble opinion, I think Go should handle
concurrency when leveraging CGO.

# Supporting Data Types

![][s7]

Data types differ between these two languages. Python does not have strict
typing, while Go does. Yes, Go has generics available, but I do not
recommend pushing unknown data into Go functions. Yes, Python has
`pydantic` as a way to somewhat guardrail types, but that provides
cumbersome enforcement, which could end up overlooked or improperly
employed.

Python's ctypes provides guardrails, if you add `argtypes`. Declare the C
types expected and ctypes validates arguments before performing function
calls. A string sent to a `c_int` export raises `TypeError`. C and Go never
see that call.

With `argtypes` unset, ctypes has no insight into expect function parameters.
Some mismatches come back as bad processing or unexpected output. Some crash.
Go may panic or the code may end up triggering a segmentation fault.

The pytest suite sets the argument and return types, then checks every
value that comes back.

# Thank You

![][s8]

The QR code points at the repository,
[github.com/bandarji/import-go-from-python][repo]. I thank [/dev/reno][dr] for
granting me a few minutes to present this content. Looking forward to giving
another talk on a different topic at some point in the near future.

[dr]: https://www.meetup.com/dev-reno/
[repo]: https://github.com/bandarji/import-go-from-python
[slidemd]: https://github.com/bandarji/import-go-from-python/blob/main/DEVRENOSLIDES.md
[readme]: https://github.com/bandarji/import-go-from-python/blob/main/README.md
[presentation]: https://docs.google.com/presentation/d/1b6v49vVIAyuZa3kUWfpnX1G3Lo9DH0yu5STnj1W9Ymc/
[ctypes]: https://docs.python.org/3/library/ctypes.html
[wwwuv]: https://docs.astral.sh/uv/getting-started/installation/
[wwwgo]: https://go.dev/doc/install
[wwwgit]: https://git-scm.com/install/
[wwwdocker]: https://docs.docker.com/get-started/get-docker/
[cgobm]: https://pkg.go.dev/cmd/go#hdr-Build_modes
[dpyimage]: https://hub.docker.com/_/python
[dgoimage]: https://hub.docker.com/_/golang
[duv]: https://docs.astral.sh/uv/guides/integration/docker/
[ccgo]: https://pkg.go.dev/cmd/cgo
[pycgo]: https://pkg.go.dev/cmd/cgo#hdr-C_references_to_Go
[wwwpytest]: https://docs.pytest.org/
[gopy]: https://github.com/go-python/gopy
[s1]: https://bandarji.com/images/sjeblog-callgofrompy.jpg
[s2]: https://bandarji.com/images/sjeblog-gofrompy-2.png
[s3]: https://bandarji.com/images/sjeblog-gofrompy-3.png
[s4]: https://bandarji.com/images/sjeblog-gofrompy-4.png
[s5]: https://bandarji.com/images/sjeblog-gofrompy-5.png
[s6]: https://bandarji.com/images/sjeblog-gofrompy-6.png
[s7]: https://bandarji.com/images/sjeblog-gofrompy-7.png
[s8]: https://bandarji.com/images/sjeblog-gofrompy-8.png
