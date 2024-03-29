import * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'
import lift from './lift.js'

/** @returns parser that consumes reader until tail-parser succeeds. */
export const until =
  <T extends Parser.Liftable>(parser: T): Parser.t<{ head: string, tail: Parser.Parsed<T> }> => {
    const parser_ = lift(parser)
    return (reader: Reader.t) => {
      const reader_ = Reader.mutable(reader)
      while (!Reader.end(reader_)) {
        const result = parser_(reader_)
        if (Result.failed(result)) {
          reader_.offset++
          continue
        }
        const length = reader_.offset - reader.offset
        return Result.ok(reader, result.reader.offset - reader.offset, {
          head: Reader.slice(reader, 0, length),
          tail: result.value as Parser.Parsed<T>
        })
      }
      return Result.fail(reader, Reader.length(reader), 'reached end of input')
    }
  }

export default until
