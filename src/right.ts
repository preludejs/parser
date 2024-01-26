import map from './map.js'
import pair from './pair.js'
import type * as Parser from './parser.js'

/** @returns `b` after successful `a` and `b` sequence match. */
export function right<B>(a: Parser.Liftable, b: Parser.t<B>): Parser.t<B> {
  return map(pair(a, b), _ => _[1])
}

export default right
