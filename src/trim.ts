import map from './map.js'
import sequence from './sequence.js'
import type * as Parser from './parser.js'
import ws0 from './ws0.js'

/** @returns parser with left (default {@link ws0}) and right (default `left`) trim parsers. */
export default function trim(
  left: Parser.t<unknown> = ws0,
  right: Parser.t<unknown> = left
) {
  return function <A>(a: Parser.t<A>): Parser.t<A> {
    return map(sequence(left, a, right), _ => _[1])
  }
}
