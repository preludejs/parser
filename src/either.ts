import * as Result from './result.js'
import type * as Parser from './parser.js'

/** @returns parser matching either `a` or `b`. */
export default function either<A, B>(a: Parser.t<A>, b: Parser.t<B>): Parser.t<A | B> {
  return function (reader) {
    const result = a(reader)
    return Result.failed(result) ?
      b(reader) :
      result
  }
}
