import Invalid from './invalid'
import type P from './parser'
import type R from './result'

/** @returns parser matching at least `min` (default 0) times `a` parser. */
const star =
  <A>(a: P<A>, min = 0): P<A[]> =>
    input => {
      const r: A[] = []
      let input_ = input
      const eat = (_: R<A>) => ((input_ = _[0]), r.push(_[1]), true)
      while (true) {
        try {
          eat(a(input_))
        } catch (err) {
          if (err instanceof Invalid) {
            break
          }
          throw err
        }
      }
      if (r.length < min) {
        throw new Invalid(input, `Expected to match minimum length ${min}, matched only ${r.length}.`)
      }
      return [ input_, r ]
    }

export default star
