import pair from './pair.js'
import map from './map.js'
import type P from './parser.js'

const right =
  <B>(a: P<unknown>, b: P<B>): P<B> =>
    map(pair(a, b), _ => _[1])

export default right
