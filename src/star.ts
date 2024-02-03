import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Liftable, Parsed } from './parser.js'

/** @returns parser matching at least `min` (default 0) times `a` parser. */
export function star<A extends Liftable>(
  parser: A,
  min = 0
): Parser<Parsed<A>[]> {
  const liftedParser = lift(parser)
  return function (originalReader) {
    const values: Parsed<A>[] = []
    let reader = originalReader
    while (true) {
      const result = liftedParser(reader)
      if (Result.failed(result)) {
        break
      }
      values.push(result.value as Parsed<A>)
      reader = result.reader
    }
    if (values.length < min) {
      return Result.fail(originalReader, `Expected to match minimum length ${min}, matched only ${values.length}.`)
    }
    return Result.ok(reader, values)
  }
}

export default star
