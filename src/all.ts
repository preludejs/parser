import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'
import next from './next.js'

/**
 * Tries to find all maches advancing by single character until end of reader.
 * Always fully consumes reader.
 */
export function all<T>(parser: Parser.t<T>) {
  const next_ = next(parser)
  return (reader: Reader.t) => {
    const values: T[] = []
    let reader_ = reader
    while (!Reader.end(reader_)) {
      const result = next_(reader_)
      if (Result.failed(result)) {
        break
      }
      values.push(result.value)
      reader_ = result.reader
    }
    return Result.ok(reader, Reader.length(reader), values)
  }
}

export default all
