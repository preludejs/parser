import Invalid from './invalid.js'
import maybe from './maybe.js'
import type P from './parser.js'

const union =
  <T extends P<unknown>[]>(...as: T): T[number] =>
    input => {
      for (const a of as) {
        const [ s, r ] = maybe(a)(input)
        if (typeof r !== 'undefined') {
          return [ s, r ]
        }
      }
      throw new Invalid(input, `None of ${as.length} alternatives matched.`)
    }

export default union
