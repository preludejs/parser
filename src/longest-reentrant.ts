import * as Result from './result.js'
import type * as Parser from './parser.js'
import type * as Reader from './reader.js'

const reentry = new WeakMap<Reader.t, Set<Parser.t<unknown>>>()

export function longestReentrant<Parsers extends Parser.t<unknown>[]>(
  ...parsers: Parsers
): Parser.t<Parser.Parsed<Parsers[number]>> {
  return function (reader) {
    const set = reentry.get(reader) ?? reentry.set(reader, new Set).get(reader)!
    let result: undefined | Result.Ok<unknown> = undefined
    for (const parser of parsers) {
      if (set.has(parser)) {
        continue
      }
      set.add(parser)
      const result_ = parser(reader)
      set.delete(parser)
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

export default longestReentrant
