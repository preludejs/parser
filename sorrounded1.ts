import type { Parser } from './prelude.js'
import map from './map.js'
import sequence from './sequence.js'

/** @returns `a` parser sorrounded by `s` at the beginning and at the end. */
const sorrounded1 =
  <A>(s: Parser<unknown>, a: Parser<A>): Parser<A> =>
    map(sequence(s, a, s), _ => _[1])

export default sorrounded1
