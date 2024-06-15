import map from './map.js'
import seq from './seq.js'
import type * as Parser from './parser.js'
import ws0 from './ws0.js'

/** @returns parser with left (default {@link ws0}) trim parser. */
export function ltrim(
  left: Parser.Liftable = ws0
) {
  return function <A> (a: Parser.t<A>): Parser.t<A> {
    return map(seq(left, a), _ => _[1])
  }
}

export default ltrim
