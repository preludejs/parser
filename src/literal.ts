import type * as Parser from './parser.js'
import * as Result from './result.js'
import * as Reader from './reader.js'

export function literal<T extends string>(expected: T): Parser.t<T> {
  return function (reader) {
    return Reader.startsWith(reader, expected) ?
      Result.eat(reader, expected.length) as Result.Ok<T> :
      Result.fail(reader, `Expected ${expected}.`)
  }
}

export {
  literal as lit
}

export default literal
