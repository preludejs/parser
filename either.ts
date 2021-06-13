import Invalid from './invalid.js'
import type P from './parser.js'

const either =
  <A, B>(a: P<A>, b: P<B>): P<A | B> =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return b(input)
        }
        throw err
      }
    }

export default either
