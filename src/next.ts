import * as Reader from './reader.js'
import * as Result from './result.js'
import lift from './lift.js'
import type * as Parser from './parser.js'

/**
 * Tries to next match for provided parser.
 * @see {@link all} to list all matches.
 * @see {@link until} to access head and tail of match.
 */
export function next<T extends Parser.Liftable>(parser: T): Parser.t<Parser.Parsed<T>> {
  const parser_ = lift(parser)
  return (reader: Reader.t) => {
    const reader_ = Reader.mutable(reader)
    while (!Reader.end(reader_)) {
      const result = parser_(reader_)
      if (!Result.failed(result)) {
        return result as Result.t<Parser.Parsed<T>>
      }
      reader_.offset++
    }
    return Result.fail(reader, 'next match not found')
  }
}

export default next
