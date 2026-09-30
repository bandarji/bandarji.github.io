---
layout: post
title: "Calling Go Functions From Python"
date: 2026-09-28
categories: [coding]
excerpt: "Write in Go; use from Python."
---

![Introductory Presentation Slide][slide]

On September 28, I gave a lightning talk at [/dev/reno][dr] about calling Go
functions from Python. While not as simple as `import go`, the talk stepped
through the proof of concept work of compiling a shared library, loadable
from Python with [`ctypes`][ctypes].

# Source Code

I placed all the source on Github, in [bandarji/import-go-from-python][repo].
A link to the presentation slides exists in the repository, but you can also
[click here][presentation] to view them. Because I intend to build upon this
idea, I have requested for question, comment and issue submissions on
Github.

# Installation

I used [uv][wwwuv] v0.12 for managing Python's (v3.14.7) packages and its
virtual environment. Go v1.27.1, in the Docker container, compiled the shared
library. I validated the work from within containers running with
[Docker][wwwdocker] v29.6.2.

# File Layout

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

# Crossing the C ABI

`cgotopypoc` builds as a [c-shared library][cgobm]. Each exported function
returns a C-compatible value and Python binds those symbols through ctypes.

| Python type | CGO return | Function |
| :--- | :--- | :--- |
| `None` | `NULL` `void*` | `ReturnNone` |
| `bool` | `GoUint8` | `ReturnBoolTrue`, `ReturnBoolFalse` |
| `int` | `int8`–`int64`, `uint8`–`uint64` | `ReturnInt8` … `ReturnUint64` |
| `float` | `float32`, `float64` | `ReturnFloat32`, `ReturnFloat64` |
| `complex` | `CPyComplex64`, `CPyComplex128` | `ReturnComplex64`, `ReturnComplex128` |
| `str` | `char*` (UTF-8) | `ReturnString`, `ReturnEmptyString`, `ReturnUnicodeString` |
| `bytes` | `char*` + length | `ReturnBytes` |

Complex values cross as small C structs of two floats or two doubles. Python
rebuilds them with `complex(real, imag)`. Strings and byte slices come back
as `char*`. Python copies the bytes, then calls `FreeCString` so the C
allocation does not linger. The Unicode check returns `बंदरजी`.

# A Go struct

`record.go` defines a Go struct with three fields. CGO rejects a Go struct
in an `//export` signature (`Go type not supported in export: struct`), so
the exported functions copy `Record` to and from `CRecord`, a C struct with
the same field order and sizes. Python declares that layout as a
`ctypes.Structure` and reads the value back as a `Record` named tuple.

# Building the library

```bash
# macOS, on my development laptop
cd cgotopypoc
CGO_ENABLED=1 go build -buildmode=c-shared -o libcgotopypoc.dylib .

# Linux, inside the Docker container
cd cgotopypoc
CGO_ENABLED=1 go build -buildmode=c-shared -o libcgotopypoc.so .
```

`cgotopypoc.py` can run that same build, load the result with
`ctypes.CDLL`, and set `restype` on each export before the assertions run.

# Tests

[pytest][wwwpytest] checks that each Go function comes back as the Python
type I expect. uv installs pytest as a development dependency.

```bash
cd gonpypoc
uv add --dev pytest
uv run pytest
```

Or, run `make docker-test`.

[dr]: https://www.meetup.com/dev-reno/
[repo]: https://github.com/bandarji/import-go-from-python
[presentation]: https://docs.google.com/presentation/d/1b6v49vVIAyuZa3kUWfpnX1G3Lo9DH0yu5STnj1W9Ymc/
[wwwuv]: https://docs.astral.sh/uv/getting-started/installation/
[wwwgo]: https://go.dev/doc/install
[wwwdocker]: https://docs.docker.com/get-started/get-docker/
[cgobm]: https://pkg.go.dev/cmd/go#hdr-Build_modes
[ctypes]: https://docs.python.org/3/library/ctypes.html
[ccgo]: https://pkg.go.dev/cmd/cgo
[pycgo]: https://pkg.go.dev/cmd/cgo#hdr-C_references_to_Go
[wwwpytest]: https://docs.pytest.org/
[dpyimage]: https://hub.docker.com/_/python
[dgoimage]: https://hub.docker.com/_/golang
[duv]: https://docs.astral.sh/uv/guides/integration/docker/
[slide]: https://bandarji.com/images/sjeblog-callgofrompy.jpg
