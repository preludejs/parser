import pair from './pair'
import map from './map'
import type P from './parser'

const right =
  <B>(a: P<unknown>, b: P<B>): P<B> =>
    map(pair(a, b), _ => _[1])

export default right
