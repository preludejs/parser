import type P from './parser'
import map from './map'
import sequence from './sequence'

const enclosed =
  <A>(lhs: P<unknown>, rhs: P<unknown>, a: P<A>): P<A> =>
    map(sequence(lhs, a, rhs), _ => _[1])

export default enclosed
