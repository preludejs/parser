import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

/**
 * Advances while next character is not listed in `chars`.
 *
 * Parser must match at least `min` (default `0`) characters to succeed.
 */
export function whileNotChars(chars: string, min = 0): Parser.t<string> {
  return function (reader) {
    let i = 0
    let char = Reader.peek(reader, i)
    while (char && !chars.includes(char)) {
      char = Reader.peek(reader, ++i)
    }
    return i >= min ?
      Result.eat(reader, i) :
      Result.fail(reader, `While not char(s) ${chars} failed for min ${min} (i ${i}).`)
  }
}

export default whileNotChars
