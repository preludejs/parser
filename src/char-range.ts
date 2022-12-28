import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/**
 * @returns parser matching provided character `ranges`.
 * @example
 *   charRange('09azAZ') // equivalent to /[0-9a-zA-Z]/ regexp.
 */
export default function charRange(ranges: string): Parser.t<string> {
  return function (reader) {
    const c = Reader.peek(reader)
    if (!c) {
      return Result.fail(reader, 'End of input.')
    }
    for (let i = 0; i < ranges.length; i += 2) {
      if (ranges[i] <= c && c <= ranges[i + 1]) {
        return Result.ok(reader, c, 1)
      }
    }
    return Result.fail(reader, `Not in char range ${ranges}.`)
  }
}
