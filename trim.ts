import map from './map.js'
import sequence from './sequence.js'
import type P from './parser.js'
import ws0 from './ws0.js'

const trim =
  <A>(a: P<A>): P<A> =>
    map(sequence(ws0, a, ws0), _ => _[1])

export default trim
