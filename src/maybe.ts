import lift from './lift.js'
import type { Parser, Parsed, ParserLike, ParserOf } from './parser.js'
import * as Result from './result.js'

export function maybe<A extends ParserLike>(parser: A): Parser<undefined | Parsed<ParserOf<A>>> {
  const liftedParser = lift(parser)
  return function (reader) {
    const result = liftedParser(reader)
    return Result.failed(result) ?
      Result.ok<undefined>(reader, undefined) :
      result as Result.Ok<Parsed<ParserOf<A>>>
  }
}

export default maybe
