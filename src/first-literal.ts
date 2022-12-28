
import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser succeeding on the first matched literal. */
export default function firstLiteral<T extends string>(...literals: T[]): Parser.t<T> {
  return function (input) {
    for (const literal of literals) {
      if (Reader.startsWith(input, literal)) {
        return Result.eat(input, literal.length) as Result.Ok<T>
      }
    }
    return Result.fail(input, `Expected one of literals ${literals.join(', ')}.`)
  }
}
