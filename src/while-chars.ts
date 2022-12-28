import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

/** Matches any char listed in `chars` at least `min` (default `0`) times. */
export default function whileChars(chars: string, min = 0): Parser.t<string> {
  return function (input) {
    let i = 0
    let char = Reader.peek(input, i)
    while (char && chars.includes(char)) {
      char = Reader.peek(input, ++i)
    }
    return i >= min ?
      Result.eat(input, i) :
      Result.fail(input, `While char(s) ${chars} failed for min ${min} (i ${i}).`)
  }
}
