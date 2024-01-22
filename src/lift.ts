import type { Liftable, Lifted } from './parser.js'
import regexp from './regexp.js'
import literal from './literal.js'

export const lift =
  <T extends Liftable>(liftable: T): Lifted<T> => {
    if (typeof liftable === 'string') {
      return literal(liftable) as Lifted<T>
    }
    if (liftable instanceof RegExp) {
      return regexp(liftable) as Lifted<T>
    }
    return liftable as Lifted<T>
  }

export default lift
