import type * as P from './parser.js'
import * as Result from './result.js'

/** Always matches, doesn't consume. */
export const empty: P.Parser<undefined> =
  reader =>
    Result.ok(reader, undefined)

export default empty
