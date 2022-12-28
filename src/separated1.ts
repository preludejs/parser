import map from './map.js'
import right from './right.js'
import sequence from './sequence.js'
import star from './star.js'
import type * as Parser from './parser.js'

const separated1 =
  <A>(s: Parser.t<unknown>, a: Parser.t<A>): Parser.t<A[]> =>
    map(sequence(a, star(right(s, a))), _ => [ _[0], ..._[1] ])

export default separated1
