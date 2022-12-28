
import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser succeeding on the first matched literal. */
export function firstLiteral<T extends string>(...literals: T[]): Parser.t<T> {
  return function (reader) {
    for (const literal of literals) {
      if (Reader.startsWith(reader, literal)) {
        return Result.eat(reader, literal.length) as Result.Ok<T>
      }
    }
    return Result.fail(reader, `Expected one of literals ${literals.join(', ')}.`)
  }
}
