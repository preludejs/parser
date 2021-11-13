import map from './map.js'
import sequence from './sequence.js'
import type { Parser } from './prelude.js'

/** @returns `a` parser sorrounded by `lhs` and `rhs`. */
const sorrounded =
  <A>(lhs: Parser<unknown>, rhs: Parser<unknown>, a: Parser<A>): Parser<A> =>
    map(sequence(lhs, a, rhs), _ => _[1])

export default sorrounded
