import map from './map.js'
import sequence from './sequence.js'
import type * as Parser from './parser.js'

/** @returns `a` parser sorrounded by `start` and `end`. */
export function between<A>(
  start: Parser.t<unknown>,
  end: Parser.t<unknown>,
  parser: Parser.t<A>
): Parser.t<A> {
  return map(sequence(start, parser, end), _ => _[1])
}

export default between
