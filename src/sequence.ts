import * as Result from './result.js'
import lift from './lift.js'
import type { Liftable, Parsed, Parser } from './parser.js'

export function sequence<T extends Liftable[]>(
  ...parsers: T
): Parser<{ [K in keyof T]: Parsed<T[K]> }> {
  const liftedParsers = parsers.map(lift)
  return function (reader) {
    const rs: unknown[] = []
    let reader_ = reader
    for (const parser of liftedParsers) {
      const result = parser(reader_)
      if (Result.failed(result)) {
        return Result.fail(reader, `Failed sequence. ${result.reason}`)
      }
      rs.push(result.value)
      reader_ = result.reader
    }
    return Result.ok(reader_, rs) as Result.Ok<{ [K in keyof T]: Parsed<T[K]> }>
  }
}

export {
  sequence as seq
}

export default sequence
