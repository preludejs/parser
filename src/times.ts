import * as Result from './result.js'
import type { Parser, Parsed, Liftable } from './parser.js'
import lift from './lift.js'

export function times<A extends Liftable>(
  n: number,
  parser: A
): Parser<Parsed<A>[]> {
  const liftedParser = lift(parser)
  return function (originalReader) {
    const results: Parsed<A>[] = []
    let reader = originalReader
    for (let i = 0; i < n; i++) {
      const result = liftedParser(reader)
      if (Result.failed(result)) {
        return Result.fail(originalReader, result.reader.offset - originalReader.offset, `Expected ${n} times, got ${i + 1} times only.`)
      }
      results.push(result.value as Parsed<A>)
      reader = result.reader
    }
    return Result.ok(originalReader, reader.offset - originalReader.offset, results)
  }
}

export default times
