import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Parsed, ParserLike, ParserOf } from './parser.js'

export function map<A extends ParserLike, B>(
  parser: A,
  f: (value: Parsed<ParserOf<A>>) => B
): Parser<B> {
  const liftedParser = lift(parser)
  return function (reader) {
    const result = liftedParser(reader)
    return Result.failed(result) ?
      result :
      Result.ok(result.reader, f(result.value as Parsed<ParserOf<A>>))
  }
}

export default map
