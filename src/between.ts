import map from './map.js'
import seq from './seq.js'
import type { Parser, ParserLike } from './parser.js'

/** @returns `a` parser sorrounded by `start` and `end`. */
export function between<A>(
  start: ParserLike,
  end: ParserLike,
  parser: Parser<A>
): Parser<A> {
  return map(seq(start, parser, end), _ => _[1])
}

export default between
