import * as Result from './result.js'
import lift from './lift.js'
import type { Liftable, Parsed, Parser } from './parser.js'

export function sequence<T extends Liftable[]>(
  ...parsers: T
): Parser<{ [K in keyof T]: Parsed<T[K]> }> {
  const liftedParsers = parsers.map(lift)
  return function (originalReader) {
    const results: unknown[] = []
    let reader = originalReader
    for (const parser of liftedParsers) {
      const result = parser(reader)
      if (Result.failed(result)) {
        return Result.fail(originalReader, `Failed sequence. ${result.reason}`)
      }
      results.push(result.value)
      reader = result.reader
    }
    return Result.ok(reader, results) as Result.Ok<{ [K in keyof T]: Parsed<T[K]> }>
  }
}

export {
  sequence as seq
}

export default sequence
