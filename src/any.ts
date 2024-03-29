import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/** @returns any single character. */
export const any: Parser.t<string> =
  (reader: Reader.t) => {
    const char = Reader.peek(reader)
    if (char === undefined) {
      return Result.fail(reader, 'end of input')
    }
    return Result.ok(reader, char, 1)
  }

export default any
