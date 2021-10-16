import type P from './parser.js'
import map from './map.js'
import sequence from './sequence.js'

/** @returns `a` parser sorrounded by `s` at the beginning and at the end. */
const sorrounded1 =
  <A>(s: P<unknown>, a: P<A>): P<A> =>
    map(sequence(s, a, s), _ => _[1])

export default sorrounded1
