import map from './map'
import sequence from './sequence'
import star from './star'
import right from './right'
import type P from './parser'

const separated1 =
  <A>(s: P<unknown>, a: P<A>): P<A[]> =>
    map(sequence(a, star(right(s, a))), _ => [ _[0], ..._[1] ])

export default separated1
