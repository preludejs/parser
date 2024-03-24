import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/** Tries to find match advancing by single character until end of reader. */
export function next<T>(parser: Parser.t<T>) {
  return (reader: Reader.t) => {
    const reader_ = Reader.mutable(reader)
    while (!Reader.end(reader_)) {
      const result = parser(reader_)
      if (!Result.failed(result)) {
        return result
      }
      reader_.offset++
    }
    return Result.fail(reader, 'next match not found')
  }
}

export default next
