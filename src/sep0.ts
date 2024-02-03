import * as Result from './result.js'
import rescue from './rescue.js'
import sep1 from './sep1.js'
import type { Parser, Liftable } from './parser.js'

/**
 * Parses `parser` zero or more separated elements.
 * Potentially non-advancing parser.
 * @param separator
 * @param parser
 * @returns
 */
export const sep0 =
  <A>(separator: Liftable, parser: Parser<A>): Parser<A[]> =>
    rescue(sep1(separator, parser), _ => Result.ok(_.reader, []))

export {
  sep0 as separated0
}

export default sep0
