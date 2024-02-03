import * as Result from './result.js'
import type { Parser, Parsed, Liftable } from './parser.js'
import type * as Reader from './reader.js'
import lift from './lift.js'

const reentry = new WeakMap<Reader.t, Set<Parser>>()

export function longestReentrant<T extends Liftable[]>(
  ...parsers: T
): Parser<Parsed<T[number]>> {
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
      result as Result.Ok<Parsed<T[number]>> :
      Result.fail(reader, `None of ${liftedParsers.length} alternatives matched at ${reader.offset}.`)
  }
}

export default longestReentrant
