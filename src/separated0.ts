import * as Result from './result.js'
import rescue from './rescue.js'
import sep1 from './separated1.js'
import type { Parser, Liftable } from './parser.js'

/**
 * Parses `parser` zero or more elements separated by `separator`.
 * Potentially non-advancing parser.
 * @param separator
 * @param parser
 * @returns
 */
export const separated0 =
  <A>(separator: Liftable, parser: Parser<A>): Parser<A[]> =>
    rescue(sep1(separator, parser), _ => Result.ok(_.reader, []))

export {
  separated0 as sep0
}

export default separated0
