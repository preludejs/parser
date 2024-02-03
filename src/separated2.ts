import map from './map.js'
import right from './right.js'
import seq from './sequence.js'
import star from './star.js'
import type * as P from './parser.js'

/** @returns parser that parses `parser` separated by `separator` at least once. */
export const separated2 =
  <A>(separator: P.Liftable, parser: P.t<A>): P.t<A[]> =>
    map(seq(parser, star(right(separator, parser), 1)), _ => [ _[0], ..._[1] ])

export {
  separated2 as sep2
}

export default separated2
