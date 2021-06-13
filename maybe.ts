import Invalid from './invalid'
import type P from './parser'

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
