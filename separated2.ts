import map from './map.js'
import sequence from './sequence.js'
import star from './star.js'
import right from './right.js'
import type P from './parser.js'

const separated2 =
  <A>(s: P<unknown>, a: P<A>): P<A[]> =>
    map(sequence(a, star(right(s, a), 1)), _ => [ _[0], ..._[1] ])

export default separated2
