import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

/** Matches any char listed in `chars` at least `min` (default `0`) times. */
export function whileChars(chars: string, min = 0): Parser.t<string> {
  return function (reader) {
    let i = 0
    let char = Reader.peek(reader, i)
    while (char && chars.includes(char)) {
      char = Reader.peek(reader, ++i)
    }
    return i >= min ?
      Result.eat(reader, i) :
      Result.fail(reader, `While char(s) ${chars} failed for min ${min} (i ${i}).`)
  }
}

export default whileChars
