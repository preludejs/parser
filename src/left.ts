import map from './map.js'
import pair from './pair.js'
import type * as Parser from './parser.js'

export const left =
  <T extends Parser.ParserLike>(a: T, b: Parser.ParserLike): Parser.t<Parser.Parsed<T>> =>
    map(pair(a, b), _ => _[0])

export default left
