import * as Result from './result.js'
import type * as Parser from './parser.js'

export default function sequence<T extends Parser.t<unknown>[]>(
  ...parsers: T
): Parser.t<{ [K in keyof T]: Parser.Parsed<T[K]> }> {
  return function (reader) {
    const rs: unknown[] = []
    let reader_ = reader
    for (const parser of parsers) {
      const result = parser(reader_)
      if (Result.failed(result)) {
        return Result.fail(reader, `Failed sequence. ${result.reason}`)
      }
      rs.push(result.value)
      reader_ = result.input
    }
    return Result.ok(reader_, rs) as Result.Ok<{ [K in keyof T]: Parser.Parsed<T[K]> }>
  }
}
