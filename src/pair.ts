import type * as Parser from './parser.js'
import * as Result from './result.js'

export default function pair<A, B>(a: Parser.t<A>, b: Parser.t<B>): Parser.t<[A, B]> {
  return function (reader) {
    const a_ = a(reader)
    if (Result.failed(a_)) {
      return a_
    }
    const b_ = b(a_.input)
    if (Result.failed(b_)) {
      return Result.fail(reader, b_.reason)
    }
    return Result.ok(b_.input, [ a_.value, b_.value ])
  }
}
