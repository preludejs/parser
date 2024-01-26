import * as Result from './result.js'
import type * as Parser from './parser.js'

/**
 * Matches longest successful result.
 * @see {@link longestReentrant} for variant that can match recursive parsers.
 */
export function longest<Parsers extends Parser.t[]>(
  ...parsers: Parsers
): Parser.t<Parser.Parsed<Parsers[number]>> {
  return function (reader) {
    let result: undefined | Result.Ok = undefined
    for (const parser of parsers) {
      const result_ = parser(reader)
      if (!Result.failed(result_)) {
        if (result === undefined || result.reader.offset < result_.reader.offset) {
          result = result_
        }
      }
    }
    return result !== undefined ?
      result as Result.Ok<Parser.Parsed<Parsers[number]>> :
      Result.fail(reader, `None of ${parsers.length} alternatives matched at ${reader.offset}.`)
  }
}

export { longest as or }

export default longest
