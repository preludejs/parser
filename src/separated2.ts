import map from './map.js'
import right from './right.js'
import seq from './sequence.js'
import star from './star.js'
import type * as P from './parser.js'

export const separated2 =
  <A>(separator: P.Liftable, parser: P.t<A>): P.t<A[]> =>
    map(seq(parser, star(right(separator, parser), 1)), _ => [ _[0], ..._[1] ])

export default separated2
