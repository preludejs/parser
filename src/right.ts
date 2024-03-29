import map from './map.js'
import pair from './pair.js'
import type * as Parser from './parser.js'

/** @returns `b` after successful `a` and `b` sequence match. */
export const right =
  <T extends Parser.Liftable>(a: Parser.Liftable, b: T): Parser.t<Parser.Parsed<T>> =>
    map(pair(a, b), _ => _[1])

export default right
