import map from './map.js'
import seq from './seq.js'
import type { ParserLike } from './parser.js'
import ws0 from './ws0.js'

/** @returns parser with left (default {@link ws0}) and right (default `left`) trim parsers. */
export function trim(
  left: ParserLike = ws0,
  right: ParserLike = left
) {
  return function <A extends ParserLike> (parser: A) {
    return map(seq(left, parser, right), _ => _[1])
  }
}

export default trim
