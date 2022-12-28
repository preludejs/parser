import type * as Parser from './parser.js'
import * as Result from './result.js'

export function pair<A, B>(a: Parser.t<A>, b: Parser.t<B>): Parser.t<[A, B]> {
  return function (reader) {
    const a_ = a(reader)
    if (Result.failed(a_)) {
      return a_
    }
    const b_ = b(a_.reader)
    if (Result.failed(b_)) {
      return Result.fail(reader, b_.reason)
    }
    return Result.ok(b_.reader, [ a_.value, b_.value ])
  }
}

export default pair
