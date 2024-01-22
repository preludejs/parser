import * as Reader from './reader.js'
import * as Result from './result.js'

export type Parser<T> =
  (reader: Reader.t) =>
    Result.t<T>

export type t<T> =
  Parser<T>

export type Parsed<T> =
  T extends Parser<infer R> ?
    R :
    never

export type Liftable =
  | string
  | RegExp
  | Parser<unknown>

export type Lifted<T extends Liftable> =
  T extends string ?
    Parser<T> :
    T extends RegExp ?
      Parser<string> :
      T extends Parser<unknown> ?
        T :
        never

export function parse<A>(parser: Parser<A>, input: string): A {
  const reader = Reader.of(input)
  const result = parser(reader)
  if (Result.failed(result)) {
    throw new Error(result.reason)
  }
  if (!Reader.end(result.reader)) {
    throw new Error(`Expected exhaustive result, unparsed ${result.reader.input.length - result.reader.offset}.`)
  }
  return result.value
}

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
export function parser<A>(parser: Parser<A>) {
  return function (input: string): A {
    return parse(parser, input)
  }
}
