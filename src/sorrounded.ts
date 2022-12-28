import map from './map.js'
import sequence from './sequence.js'
import type * as Parser from './parser.js'

/** @returns `a` parser sorrounded by `lhs` and `rhs`. */
const sorrounded =
  <A>(lhs: Parser.t<unknown>, rhs: Parser.t<unknown>, a: Parser.t<A>): Parser.t<A> =>
    map(sequence(lhs, a, rhs), _ => _[1])

export default sorrounded
