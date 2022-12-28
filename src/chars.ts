import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/** @returns parser matching one of provided chars. */
export default function chars(chars_: string): Parser.t<string> {
  return chars_.length === 1 ?
    function (input) {
      return Reader.peek(input) === chars_ ?
        Result.eat(input, 1) :
        Result.fail(input, `Expected char ${chars_}.`)
    } :
    function (input) {
      const char = Reader.peek(input)
      return char && chars_.includes(char) ?
        Result.eat(input, 1) :
        Result.fail(input, `Expected one of chars ${chars_}.`)
    }
}
