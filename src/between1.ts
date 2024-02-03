import map from './map.js'
import seq from './sequence.js'
import type { Parser, Liftable } from './parser.js'

/** @returns `a` parser sorrounded by `s` at the beginning and at the end. */
export function between1<A>(startEnd: Liftable, parser: Parser<A>): Parser<A> {
  return map(seq(startEnd, parser, startEnd), _ => _[1])
}

export default between1
