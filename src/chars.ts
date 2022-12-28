import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/** @returns parser matching one of provided chars. */
export default function chars(chars_: string): Parser.t<string> {
  return chars_.length === 1 ?
    function (reader) {
      return Reader.peek(reader) === chars_ ?
        Result.eat(reader, 1) :
        Result.fail(reader, `Expected char ${chars_}.`)
    } :
    function (reader) {
      const char = Reader.peek(reader)
      return char && chars_.includes(char) ?
        Result.eat(reader, 1) :
        Result.fail(reader, `Expected one of chars ${chars_}.`)
    }
}
