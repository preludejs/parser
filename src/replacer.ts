import * as Reader from './reader.js'
import * as Result from './result.js'
import lift from './lift.js'
import type * as Parser from './parser.js'

/**
 * Returns nested result.
 * Outer result describes input replacement (original input and what was matched).
 * Inner result describes output replacement (modified input <<output>> and replacement that was used).
 */
export function replacer<T extends Parser.Liftable>(
  parser: T,
  cb: (value: Result.Ok<Parser.Parsed<T>>) => string
): Parser.t<Result.t<string>> {
  const lifted = lift(parser)
  return (reader: Reader.t) => {
    const inner = Reader.mutable(reader)
    while (!Reader.end(inner)) {
      const result = lifted(inner)
      if (!Result.failed(result)) {
        const replacement = cb(result as Result.Ok<Parser.Parsed<T>>)
        const a = inner.offset - reader.offset
        const b = a + result.length
        const input = reader.input.slice(0, a) + replacement + reader.input.slice(b)
        const result_ = Result.ok(Reader.of(input, a), replacement.length, replacement)
        return Result.ok(inner, -result.length, result_)
      }
      inner.offset++
    }
    return Result.fail(reader, Reader.length(reader), 'reached end of input')
  }
}

export default replacer
