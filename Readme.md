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

# Documentation for `@prelude/parser`

`@prelude/parser` is a parser combinator library for TypeScript, providing modular and composable tools to build parsers from smaller, reusable components. It includes combinators for common parsing tasks and specific implementations for formats like CSV (RFC4180) and JSON (RFC8259). This documentation aims to guide users through installation, core concepts, usage, and detailed API references.

---

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Core Concepts](#core-concepts)
  - [Reader](#reader)
  - [Result](#result)
  - [Parser](#parser)
- [Parser Combinators](#parser-combinators)
  - [all](#all)
  - [any](#any)
  - [between](#between)
  - [either](#either)
  - [map](#map)
  - [maybe](#maybe)
  - [pair](#pair)
  - [seq](#seq)
  - [star](#star)
  - [times](#times)
  - [trim](#trim)
  - [Additional Combinators](#additional-combinators)
- [Specific Parsers](#specific-parsers)
  - [CSV (RFC4180)](#csv-rfc4180)
  - [JSON (RFC8259)](#json-rfc8259)
- [Utilities](#utilities)
  - [parse](#parse)
  - [parser](#parser)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

`@prelude/parser` enables developers to create complex parsers by combining smaller parsers using combinators. This modular approach is particularly useful for parsing complex grammars.

**Key Features:**

- Modular and composable parser combinators.
- Support for recursive and mutually recursive parsers.
- Type-safe parsing with TypeScript.
- Pre-built parsers for CSV (RFC4180) and JSON (RFC8259).

---

## Installation

Install the library using npm:

```bash
npm install @prelude/parser
```

---

## Usage

Import the library in your TypeScript project:

### ES Modules

```typescript
import * as P from '@prelude/parser';
```

### CommonJS

```javascript
const P = require('@prelude/parser');
```

**Basic Example:**

Parse a simple parenthesized number:

```typescript
import * as P from '@prelude/parser';

const number = P.map(P.re(/\d+/), parseInt);
const parser = P.seq(P.lit('('), number, P.lit(')'));
const result = P.parse(parser, '(123)'); // Returns [ '(', 123, ')' ]
```

---

## Core Concepts

### Reader

Represents the input being parsed, with the current position.

**Type:**

```typescript
export type Reader = {
  readonly input: string,
  readonly offset: number
}
```

**Functions:**

- `of(input: string, offset?: number): Reader` - Creates a new reader from input string.
- `peek(reader: Reader, offset?: number): string | undefined` - Returns character at offset.
- `startsWith(reader: Reader, prefix: string, position?: number): boolean` - Checks if input starts with prefix.
- `rest(reader: Reader): string` - Returns remaining input.
- `end(reader: Reader): boolean` - Checks if end of input is reached.

---

### Result

Represents the outcome of a parsing operation.

**Types:**

```typescript
export type Ok<T> = {
  reader: Reader.t,
  value: T
}

export type Fail = {
  reader: Reader.t,
  reason: string
}

export type Result<T> = Ok<T> | Fail
```

**Functions:**

- `ok<T>(reader: Reader.t, value: T, advance?: number): Ok<T>` - Creates successful result.
- `fail(reader: Reader.t, reason: string): Fail` - Creates failure result.
- `failed(result: Result): result is Fail` - Checks if result is a failure.

---

### Parser

A parser is a function that takes a `Reader` and returns a `Result`.

**Type:**

```typescript
export type Parser<T> = (reader: Reader.t) => Result.t<T>
```

---

## Parser Combinators

Parser combinators build complex parsers from simpler ones. Below are detailed descriptions and examples for key combinators.

### all

Finds all matches of a parser in the input, advancing by one character until the end.

**Signature:**

```typescript
export function all<T>(parser: Parser.t<T>): Parser.t<T[]>
```

**Description:**

Tries to find all matches, advancing by single character until end of reader. Always fully consumes reader.

**Example:**

```typescript
const parser = P.all(P.re(/\d+/));
const result = P.parse(parser, 'foo 123 bar 456 baz'); // Returns [ '123', '456' ]
```

---

### any

Matches any single character.

**Signature:**

```typescript
export const any: Parser.t<string>
```

**Example:**

```typescript
const parser = P.map(P.seq('[', P.any, ']'), _ => _[1]);
const result = P.parse(parser, '[a]'); // Returns 'a'
```

---

### between

Matches a parser surrounded by start and end parsers.

**Signature:**

```typescript
export function between<A>(start: Liftable, end: Liftable, parser: Parser<A>): Parser<A>
```

**Description:**

Returns `parser` surrounded by `start` and `end`.

**Example:**

```typescript
const number = P.map(P.whileChars('0123456789'), parseFloat);
const between = P.between('(', ')', number);
const result = P.parse(P.trim()(between), ' (123)\n'); // Returns 123
```

---

### either

Chooses between two parsers.

**Signature:**

```typescript
export function either<A extends Liftable, B extends Liftable>(a: A, b: B): Parser<Parsed<A> | Parsed<B>>
```

**Description:**

Returns parser matching either `a` or `b`.

**Example:**

```typescript
const parser = P.either(P.lit('hello'), P.lit('world'));
const result = P.parse(parser, 'hello'); // Returns 'hello'
```

---

### map

Transforms the result of a parser using a provided function.

**Signature:**

```typescript
export function map<A extends Liftable, B>(parser: A, f: (value: Parsed<Lifted<A>>) => B): Parser<B>
```

**Example:**

```typescript
const numberParser = P.map(P.re(/\d+/), parseInt);
const result = P.parse(numberParser, '123'); // Returns 123
```

---

### maybe

Makes a parser optional.

**Signature:**

```typescript
export function maybe<A extends Liftable>(parser: A): Parser<undefined | Parsed<Lifted<A>>>
```

**Example:**

```typescript
const parser = P.maybe(P.lit('optional'));
const result = P.parse(parser, 'optional'); // Returns 'optional'
const result2 = P.parse(parser, ''); // Returns undefined
```

---

### pair

Combines two parsers into a tuple.

**Signature:**

```typescript
export function pair<A extends Liftable, B extends Liftable>(a: A, b: B): Parser<[ Parsed<A>, Parsed<B> ]>
```

**Example:**

```typescript
const parser = P.pair(P.lit('a'), P.lit('b'));
const result = P.parse(parser, 'ab'); // Returns [ 'a', 'b' ]
```

---

### seq

Sequences multiple parsers.

**Signature:**

```typescript
export function seq<T extends Liftable[]>(...parsers: T): Parser<{ [K in keyof T]: Parsed<T[K]> }>
```

**Description:**

Returns parser matching each provided parser in sequence.

**Example:**

```typescript
const parser = P.seq('<', /\w+/, '>');
const result = P.parse(parser, '<abc>'); // Returns [ '<', 'abc', '>' ]
```

---

### star

Matches zero or more occurrences of a parser.

**Signature:**

```typescript
export function star<A extends Liftable>(parser: A, min = 0): Parser<Parsed<A>[]>
```

**Description:**

Returns parser matching at least `min` (default 0) times `parser`.

**Example:**

```typescript
const parser = P.star(P.either('a', 'b'));
const result = P.parse(parser, 'aab'); // Returns [ 'a', 'a', 'b' ]
```

---

### times

Matches a specific number of occurrences of a parser.

**Signature:**

```typescript
export function times<A extends Liftable>(n: number, parser: A): Parser<Parsed<A>[]>
```

**Example:**

```typescript
const parser = P.times(3, 'a');
const result = P.parse(parser, 'aaa'); // Returns [ 'a', 'a', 'a' ]
```

---

### trim

Trims whitespace around a parser.

**Signature:**

```typescript
export function trim(left: Liftable = ws0, right: Liftable = left): <A extends Liftable>(parser: A) => Parser<Parsed<A>>
```

**Description:**

Returns parser with left (default `ws0`) and right (default `left`) trim parsers.

**Example:**

```typescript
const parser = P.trim()(P.star(P.either('a', 'b')));
const result = P.parse(parser, '  aab \n'); // Returns [ 'a', 'a', 'b' ]
```

---

### Additional Combinators

- `beg`: Matches beginning of input.
- `bol`: Matches beginning of line.
- `charRange`: Matches provided character ranges.
- `chars`: Matches one of provided characters.
- `end`: Matches end of input.
- `eol`: Matches end of line.
- `first`: Union where first successful match is returned.
- `firstExhaustive`: Matches first exhaustive parser.
- `firstLiteral`: Succeeds on first matched literal.
- `fromUntil`: Parses from head until tail.
- `join`: Joins result array into single string.
- `lazy`: Memoizes parser for recursion.
- `left`: Returns first parser after sequence.
- `longest`: Matches longest successful result.
- `longestReentrant`: Matches longest result for recursive parsers.
- `ltrim`: Adds left trim parser.
- `mapFailure`: Maps failure result.
- `mapReason`: Maps failure reason.
- `maybeMap`: Conditional mapping of success result.
- `next`: Tries next match for parser.
- `predicate`: Validates result with predicate.
- `refute`: Validates result with refutation function.
- `regexp`: Matches regular expression.
- `rescue`: Handles parsing failure.
- `right`: Returns second parser after sequence.
- `sep0`, `sep1`, `sep2`: Parses separated elements.
- `switch`: Matches based on prefix cases.
- `until`: Consumes until tail-parser succeeds.
- `whileChars`: Matches chars from set.
- `whileNotChars`: Matches while next char not in set.
- `ws0`, `ws1`: Matches whitespace.

---

## Specific Parsers

### CSV (RFC4180)

Implements parsing for CSV files according to [RFC4180](https://datatracker.ietf.org/doc/html/rfc4180).

**ABNF Grammar:**

```abnf
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
name = field
field = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
CR = %x0D
DQUOTE =  %x22
LF = %x0A
CRLF = CR LF
TEXTDATA =  %x20-21 / %x23-2B / %x2D-7E
```

**Usage:**

```typescript
import { Csv } from '@prelude/parser';

const csvString = `name,age\nAlice,30\nBob,25`;
const parsed = Csv.parse(csvString);
// Returns [ [ 'name', 'age' ], [ 'Alice', '30' ], [ 'Bob', '25' ] ]
```

---

### JSON (RFC8259)

Implements parsing for JSON according to [RFC8259](https://datatracker.ietf.org/doc/html/rfc8259).

**ABNF Grammar:**

```abnf
JSON-text = ws value ws
begin-array = ws %x5B ws  ; [ left square bracket
begin-object = ws %x7B ws  ; { left curly bracket
end-array = ws %x5D ws  ; ] right square bracket
end-object = ws %x7D ws  ; } right curly bracket
name-separator = ws %x3A ws  ; : colon
value-separator = ws %x2C ws  ; , comma
ws = *(%x20 / %x09 / %x0A / %x0D)
value = false / null / true / object / array / number / string
false = %x66.61.6c.73.65
null = %x6e.75.6c.6c
true = %x74.72.75.65
object = begin-object [ member *( value-separator member ) ] end-object
member = string name-separator value
array = begin-array [ value *( value-separator value ) ] end-array
number = [ minus ] int [ frac ] [ exp ]
string = quotation-mark *char quotation-mark
```

**Usage:**

```typescript
import { Json } from '@prelude/parser';

const jsonString = `{"name": "Alice", "age": 30}`;
const parsed = Json.parse(jsonString);
// Returns { name: 'Alice', age: 30 }
```

---

## Utilities

### parse

Runs a parser on input string, throwing on failure or non-exhaustive parsing.

**Signature:**

```typescript
export function parse<A>(parser_: Parser<A>, input: string): A
```

**Example:**

```typescript
const parser = P.re(/\d+/);
const result = P.parse(parser, '123'); // Returns '123'
```

---

### parser

Creates a function to parse strings with a given parser.

**Signature:**

```typescript
export function parser<A>(parser_: Parser<A>): (input: string) => A
```

**Example:**

```typescript
const p = P.parser(P.re(/\d+/));
const result = p('123'); // Returns '123'
```

---

## Examples

**Parsing Mutually Recursive Expressions:**

```typescript
type Numeric = { type: 'Numeric', value: number };
type Addition = { type: 'Addition', lhs: Expression, rhs: Expression };
type Multiplication = { type: 'Multiplication', lhs: Expression, rhs: Expression };
type Expression = Numeric | Addition | Multiplication;

const number = P.Rfc8259.number;
const add = P.lazy(() => P.map(P.seq(expr, '+', expr), _ => _[0] + _[2]));
const mul = P.lazy(() => P.map(P.seq(expr, '*', expr), _ => _[0] * _[2]));
const grouped = P.lazy(() => P.between('(', ')', expr));
const expr: P.t<number> = P.lazy(() => P.longestReentrant(number, add, mul, grouped));

const result = P.parse(expr, '(2*1)+1'); // Returns 3
```

---

## API Reference

For detailed function signatures and types, refer to the TypeScript source files. Key exports are available from `index.ts`.

---

## Contributing

To contribute:

1. Clone the repository.
2. Install dependencies: `pnpm i`.
3. Run tests: `make test`.
4. Build: `make build`.
5. Submit pull requests with changes.

---

# License

```
MIT License

Copyright 2021 Mirek Rusin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
