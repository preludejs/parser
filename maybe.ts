import Invalid from './invalid.js'
import type P from './parser.js'

const maybe =
  <A>(a: P<A>): P<undefined | A> =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return [ input, undefined ]
        }
        throw err
      }
    }

export default maybe
