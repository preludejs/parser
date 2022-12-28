import map from './map.js'
import sequence from './sequence.js'
import type * as Parser from './parser.js'

/** @returns `a` parser sorrounded by `s` at the beginning and at the end. */
export function between1<A>(startEnd: Parser.t<unknown>, parser: Parser.t<A>): Parser.t<A> {
  return map(sequence(startEnd, parser, startEnd), _ => _[1])
}

export default between1
