import map from './map.js'
import sequence from './sequence.js'
import type * as Parser from './parser.js'

/** @returns `a` parser sorrounded by `s` at the beginning and at the end. */
const sorrounded1 =
  <A>(s: Parser.t<unknown>, a: Parser.t<A>): Parser.t<A> =>
    map(sequence(s, a, s), _ => _[1])

export default sorrounded1
