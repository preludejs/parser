import map from './map.js'
import seq from './seq.js'
import type * as Parser from './parser.js'
import until from './until.js'

/** Parses input from `a` (head) until `b` (tail) returning inner string followed by head and tail. */
export const fromUntil =
  <A extends Parser.Liftable, B extends Parser.Liftable>(a: A, b: B): Parser.t<{ inner: string, head: Parser.Parsed<A>, tail: Parser.Parsed<B> }> =>
    map(seq(a, until(b)), _ => ({ head: _[0], inner: _[1].head, tail: _[1].tail }))

export default fromUntil
