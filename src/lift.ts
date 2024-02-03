import type { Liftable, Lifted } from './parser.js'
import re from './regexp.js'
import lit from './literal.js'

export const lift =
  <T extends Liftable>(liftable: T): Lifted<T> => {
    if (typeof liftable === 'string') {
      return lit(liftable) as Lifted<T>
    }
    if (liftable instanceof RegExp) {
      return re(liftable) as Lifted<T>
    }
    return liftable as Lifted<T>
  }

export default lift
