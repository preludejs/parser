import type * as Parser from './parser.js'
import * as Result from './result.js'

/** @returns parser matching at least `min` (default 0) times `a` parser. */
export default function star<A>(parser: Parser.t<A>, min = 0): Parser.t<A[]> {
  return function (reader) {
    const values: A[] = []
    let reader_ = reader
    while (true) {
      const result = parser(reader_)
      if (Result.failed(result)) {
        break
      }
      values.push(result.value)
      reader_ = result.reader
    }
    if (values.length < min) {
      return Result.fail(reader, `Expected to match minimum length ${min}, matched only ${values.length}.`)
    }
    return Result.ok(reader_, values)
  }
}
