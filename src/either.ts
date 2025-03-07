import * as Result from './result.js'
import type { ParserLike, Parsed, Parser } from './parser.js'
import lift from './lift.js'

/** @returns parser matching either `a` or `b`. */
export function either<A extends ParserLike, B extends ParserLike>(
  a: A,
  b: B
): Parser<Parsed<A> | Parsed<B>> {
  const liftedA = lift(a)
  const liftedB = lift(b)
  return function (reader) {
    const result = liftedA(reader) as Result.t<Parsed<A>>
    return Result.failed(result) ?
      liftedB(reader) as Result.t<Parsed<B>> :
      result
  }
}

export default either
