import map from './map.js'
import seq from './sequence.js'
import type { Parser, Liftable } from './parser.js'

/** @returns `a` parser sorrounded by `start` and `end`. */
export function between<A>(
  start: Liftable,
  end: Liftable,
  parser: Parser<A>
): Parser<A> {
  return map(seq(start, parser, end), _ => _[1])
}

export default between
