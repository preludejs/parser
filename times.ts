import type P from './parser'
import type R from './result'

const times =
  <A>(n: number, a: P<A>): P<A[]> =>
    input => {
      const r: A[] = []
      let input_ = input
      const eat = (_: R<A>) => ((input_ = _[0]), r.push(_[1]))
      for (let i = 0; i < n; i++) {
        eat(a(input_))
      }
      return [ input_, r ]
    }

export default times
