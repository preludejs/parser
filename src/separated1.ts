import { Parser, Liftable } from './parser.js'
import map from './map.js'
import right from './right.js'
import sequence from './sequence.js'
import star from './star.js'

/** @returns parser that parses `parser` separated by `separator` at least once. */
export const separated1 =
  <A>(separator: Liftable, parser: Parser<A>): Parser<A[]> =>
    map(sequence(parser, star(right(separator, parser))), _ => [ _[0], ..._[1] ])

export {
  separated1 as sep1
}

export default separated1
