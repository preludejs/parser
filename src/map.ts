import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Parsed, Liftable, Lifted } from './parser.js'

export function map<A extends Liftable, B>(
  parser: A,
  f: (value: Parsed<Lifted<A>>) => B
): Parser<B> {
  const liftedParser = lift(parser)
  return function (reader) {
    const result = liftedParser(reader)
    return Result.failed(result) ?
      result :
      Result.ok(result.reader, f(result.value as Parsed<Lifted<A>>))
  }
}

export default map
