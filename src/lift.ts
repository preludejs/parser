import type { ParserLike, ParserOf } from './parser.js'
import re from './regexp.js'
import lit from './lit.js'

export const lift =
  <T extends ParserLike>(liftable: T): ParserOf<T> => {
    if (typeof liftable === 'string') {
      return lit(liftable) as ParserOf<T>
    }
    if (liftable instanceof RegExp) {
      return re(liftable) as ParserOf<T>
    }
    return liftable as ParserOf<T>
  }

export default lift
