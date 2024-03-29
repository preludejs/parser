import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Parsed, Liftable, Lifted } from './parser.js'

export function map<A extends Liftable, B>(
  parser: A,
  f: (value: Parsed<Lifted<A>>) => B
): Parser<B> {
  const lifted = lift(parser)
  return function (reader) {
    const result = lifted(reader)
    return Result.failed(result) ?
      result :
      Result.ok(reader, result.reader.offset - reader.offset, f(result.value as Parsed<Lifted<A>>))
  }
}

export default map
