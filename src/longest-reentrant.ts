import * as Result from './result.js'
import type * as Parser from './parser.js'
import type * as Reader from './reader.js'
import lift from './lift.js'

const reentry = new WeakMap<Reader.t, Set<Parser.t>>()

export function longestReentrant<Parsers extends Parser.Liftable[]>(
  ...parsers: Parsers
): Parser.t<Parser.Parsed<Parser.Lifted<Parsers[number]>>> {
  const liftedParsers = parsers.map(lift)
  return function (reader) {
    const set = reentry.get(reader) ?? reentry.set(reader, new Set).get(reader)!
    let result: undefined | Result.Ok = undefined
    for (const parser of liftedParsers) {
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
      Result.fail(reader, `None of ${liftedParsers.length} alternatives matched at ${reader.offset}.`)
  }
}

export default longestReentrant
