import * as Reentry from './reentry.js'
import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Parsed, Liftable } from './parser.js'

export function longestReentrant<T extends Liftable[]>(
  ...parsers: T
): Parser<Parsed<T[number]>> {
  const liftedParsers = parsers.map(lift)
  return function (reader) {
    let result: undefined | Result.Ok = undefined
    for (const parser of liftedParsers) {
      if (!Reentry.enter(reader, parser)) {
        continue
      }
      const result_ = parser(reader)
      Reentry.leave(reader, parser)
      if (Result.failed(result_)) {
        continue
      }
      if (result === undefined || result.reader.offset < result_.reader.offset) {
        result = result_
      }
    }
    return result !== undefined ?
      result as Result.Ok<Parsed<T[number]>> :
      Result.fail(reader, `None of ${liftedParsers.length} alternatives matched at ${reader.offset}.`)
  }
}

export default longestReentrant
