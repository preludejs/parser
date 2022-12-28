import * as Result from './result.js'
import type * as Parser from './parser.js'

export default function times<A>(n: number, a: Parser.t<A>): Parser.t<A[]> {
  return function (reader) {
    const rs: A[] = []
    let reader_ = reader
    for (let i = 0; i < n; i++) {
      const a_ = a(reader_)
      if (Result.failed(a_)) {
        return Result.fail(reader, `Expected ${n} times, got ${i + 1} times only.`)
      }
      rs.push(a_.value)
      reader_ = a_.reader
    }
    return Result.ok(reader_, rs)
  }
}
