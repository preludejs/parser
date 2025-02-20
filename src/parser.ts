import * as Reader from './reader.js'
import * as Result from './result.js'

export type Parser<T = unknown> =
  (reader: Reader.t) =>
    Result.t<T>

export type t<T = unknown> =
  Parser<T>

export type Parsed<T> =
  T extends Parser<infer R> ?
    R :
    T extends string ?
      T :
      T extends RegExp ?
        string :
        never

export type Liftable<T = unknown> =
  | string
  | RegExp
  | Parser<T>

export type Lifted<T extends Liftable> =
  T extends string ?
    Parser<T> :
    T extends RegExp ?
      Parser<string> :
      T extends Parser ?
        T :
        never

export type IntersectionOfUnion<T> =
  (T extends unknown ? (_: T) => unknown : never) extends (_: infer R) => unknown ?
    R :
    never

export const lineColumn =
  (input: string, offset: number) => {
    let line = 1
    let column = 1
    for (let i = 0; i < offset; i++) {
      if (input[i] === '\n') {
        line++
        column = 1
      } else {
        column++
      }
    }
    return { line, column }
  }

export const highlight =
  (input: string, offset: number, context = 20) => {
    const start = Math.max(0, offset - context)
    const end = Math.min(input.length, offset + context)
    let fragment = input
      .slice(start, end)
      .replace(/\n/g, '⏎')
      .replace(/\t/g, '⇥')
      .replace(/\r/g, '⏵')
    const { line, column } = lineColumn(input, offset)
    let pointer = ' '.repeat(offset - start) + '^ ' + line + ':' + column
    if (offset < start) {
      fragment = '…' + fragment
      pointer = ' ' + pointer
    }
    if (offset > end) {
      fragment = fragment + '…'
    }
    return `${fragment}\n${pointer}`
  }

export function parse<A>(parser_: Parser<A>, input: string): A {
  const reader = Reader.of(input)
  const result = parser_(reader)
  if (Result.failed(result)) {
    throw new Error(result.reason)
  }
  if (!Reader.end(result.reader)) {
    throw new Error(`Expected exhaustive result, parsed ${result.reader.offset} (unparsed ${result.reader.input.length - result.reader.offset}).\n\n${highlight(input, result.reader.offset)}`)
  }
  return result.value
}

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
export function parser<A>(parser_: Parser<A>) {
  return function (input: string): A {
    return parse(parser_, input)
  }
}
