import { Parser, Liftable } from './parser.js'
import map from './map.js'
import right from './right.js'
import seq from './seq.js'
import star from './star.js'

/** @returns parser that parses `parser` separated by `separator` at least once. */
export const sep1 =
  <A>(separator: Liftable, parser: Parser<A>): Parser<A[]> =>
    map(seq(parser, star(right(separator, parser))), _ => [ _[0], ..._[1] ])

export {
  sep1 as separated1
}

export default sep1
