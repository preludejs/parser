[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=bugs)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=coverage)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=preludejs_parser&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=preludejs_parser)

---

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

# Parser module

* `dquote: Parser<string>`

* `dquote2: Parser<string>`

* `lf: Parser<string>`

* `cr: Parser<string>`

* `nl: Parser<string>`

* `textdata: Parser<string>`

* `comma: Parser<string>`

* `nonEscaped: Parser<string>`

* `escaped: Parser<string>`

* `field: Parser<string>`

* `record: Parser<string[]>`

* `file: Parser<string[][]>`

* `parse: (inputString: string) => string[][]`

* `false: Parser<boolean>`

* `null: Parser<any>`

* `parse: (inputString: string) => unknown`

* `true: Parser<boolean>`

* `valueSeparator: Parser<string>`

* `charRange: (ranges: string) => Parser<string>`

  Returns parser matching provided character `ranges`.

  Example `charRange('09azAZ')` – equivalent to /[0-9a-zA-Z]/ regexp.

* `Csv`

* `either: <A, B>(a: Parser<A>, b: Parser<B>) => Parser<A | B>`

* `exhaustive: <A>(a: Parser<A>) => (inputString: string) => A`

  Returns top level string to result parser asserting all input has been parsed.

  Throws If parser fails or input is not fully exhausted.

* `exhaustiveEmpty: (input: any) => Fail | Ok<any>`

  Returns parser that matches empty string exhaustively.

* `join: (a: Parser<string[]>, glue?: string) => Parser<string>`

  Joins `string` (or `undefined`) result array into single `string` result.

* `Json`

* `literal: (expected: string) => Parser<string>`

* `map: <A, B>(a: Parser<A>, f: (_: A) => B) => Parser<B>`

* `maybe: <A>(a: Parser<A>) => Parser<A>`

* `pair: <A, B>(a: Parser<A>, b: Parser<B>) => Parser<[A, B]>`

* `Rfc4180`

* `Rfc8259`

* `right: <B>(a: Parser<unknown>, b: Parser<B>) => Parser<B>`

  Returns `b` after successful `a` and `b` sequence match.

* `separated0: <A>(s: Parser<unknown>, a: Parser<A>) => Parser<A[]>`

* `separated1: <A>(s: Parser<unknown>, a: Parser<A>) => Parser<A[]>`

* `separated2: <A>(s: Parser<unknown>, a: Parser<A>) => Parser<A[]>`

* `sequence: <T extends Parser<unknown>[]>(...as: T) => Parser<{ [K in keyof T]: Parsed<T[K]>; }>`

* `sorrounded: <A>(lhs: Parser<unknown>, rhs: Parser<unknown>, a: Parser<A>) => Parser<A>`

  Returns `a` parser sorrounded by `lhs` and `rhs`.

* `sorrounded1: <A>(s: Parser<unknown>, a: Parser<A>) => Parser<A>`

  Returns `a` parser sorrounded by `s` at the beginning and at the end.

* `star: <A>(a: Parser<A>, min?: number) => Parser<A[]>`

  Returns parser matching at least `min` (default 0) times `a` parser.

* `times: <A>(n: number, a: Parser<A>) => Parser<A[]>`

* `trim: <A>(a: Parser<A>) => Parser<A>`

* `union: <T extends Parser<unknown>[]>(...as: T) => T[number]`

* `utf8: (chars: string) => Parser<string>`

  Returns parser matching one of provided chars.

* `whileChar: (chars: string, min?: number) => Parser<string>`

  Matches any char listed in `chars` at least `min` (default `0`) times.

* `ws0: Parser<string>`

* `ws1: Parser<string>`

# License

```
MIT License

Copyright 2021 Mirek Rusin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
