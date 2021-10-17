import type { Parser } from './prelude.js'
import pair from './pair.js'
import map from './map.js'

/** @returns `b` after successful `a` and `b` sequence match. */
const right =
  <B>(a: Parser<unknown>, b: Parser<B>): Parser<B> =>
    map(pair(a, b), _ => _[1])

export default right
