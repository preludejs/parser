import lift from './lift.js'
import type { Parser, Parsed, Liftable, Lifted } from './parser.js'
import * as Result from './result.js'

export function maybe<A extends Liftable>(parser: A): Parser<undefined | Parsed<Lifted<A>>> {
  const liftedParser = lift(parser)
  return function (reader) {
    const result = liftedParser(reader)
    return Result.failed(result) ?
      Result.ok<undefined>(reader, undefined) :
      result as Result.Ok<Parsed<Lifted<A>>>
  }
}

export default maybe
