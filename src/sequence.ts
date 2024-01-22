import * as Result from './result.js'
import type * as Parser from './parser.js'
import lift from './lift.js'

export function sequence<T extends Parser.Liftable[]>(
  ...parsers: T
): Parser.t<{ [K in keyof T]: Parser.Parsed<Parser.Lifted<T[K]>> }> {
  return function (reader) {
    const rs: unknown[] = []
    let reader_ = reader
    for (const parser of parsers) {
      const result = lift(parser)(reader_)
      if (Result.failed(result)) {
        return Result.fail(reader, `Failed sequence. ${result.reason}`)
      }
      rs.push(result.value)
      reader_ = result.reader
    }
    return Result.ok(reader_, rs) as Result.Ok<{ [K in keyof T]: Parser.Parsed<T[K]> }>
  }
}

export {
  sequence as seq
}

export default sequence
