import type * as P from './parser.js'
import * as Result from './result.js'
import lift from './lift.js'

export function pair<A extends P.Liftable, B extends P.Liftable>(
  a: A,
  b: B
): P.t<[ P.Parsed<A>, P.Parsed<B> ]> {
  const liftedA = lift(a)
  const liftedB = lift(b)
  return function (reader) {
    const resultA = liftedA(reader)
    if (Result.failed(resultA)) {
      return resultA
    }
    const resultB = liftedB(resultA.reader)
    if (Result.failed(resultB)) {
      return Result.fail(reader, resultA.length, resultB.reason)
    }
    return Result.ok(reader, resultA.length + resultB.length, [
      resultA.value as P.Parsed<A>,
      resultB.value as P.Parsed<B>
    ])
  }
}

export default pair
