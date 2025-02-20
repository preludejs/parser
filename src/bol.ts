import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser matching beginning of the line. */
export const bol =
  (reader: Reader.t) => {
    if (reader.offset === 0) {
      return Result.ok(reader, '', 0)
    }
    const char = Reader.peek(reader, -1)
    if (char === '\n') {
      return Result.ok(reader, '', 0)
    }
    return Result.fail(reader, 'expected beginning of line')
  }

export default bol
