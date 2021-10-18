# Parser combinators module

# Usage

```bash
npm i -E @prelude/parser
```

```ts
import * as P from '@prelude/parser'
```

# Rules

* [rfc4180](https://datatracker.ietf.org/doc/html/rfc4180) - CSV
* [rfc5234](https://datatracker.ietf.org/doc/html/rfc5234) – ABNF
* [rfc8259](https://datatracker.ietf.org/doc/html/rfc8259) – JSON

## Top level rules

* char-range
* char-ranges
* either
* enclosed
* exhaustive
* literal
* map
* maybe
* pair
* right
* separated0
* separated1
* separated2
* sequence
* star
* times
* trim
* union
* utf8
* ws0
* ws1

## Top level helpers

* Input
* Invalid
* join
* ParserResult
* Rfc8259

## [rfc5234](https://datatracker.ietf.org/doc/html/rfc5234) – Augmented BNF for Syntax Specifications: ABNF

* alpha
* bit
* char

## [rfc8259](https://datatracker.ietf.org/doc/html/rfc8259) – The JavaScript Object Notation (JSON) Data Interchange Format

* false
* null
* trim
* true
* ws

# License

```
MIT License

Copyright 2021 Mirek Rusin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
