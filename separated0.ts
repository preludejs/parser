import Invalid from './invalid'
import type P from './parser'
import separated1 from './separated1'

const separated0 =
  <A>(s: P<unknown>, a: P<A>): P<A[]> =>
    input => {
      try {
        return separated1(s, a)(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return [ input, [] ]
        }
        throw err
      }
    }

export default separated0
