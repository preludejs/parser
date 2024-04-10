import * as Reader from './reader.js'
import * as Result from './result.js'

export const eol =
  (reader: Reader.t) => {
    const char = Reader.peek(reader)
    if (char === undefined) {
      return Result.ok(reader, '', 0)
    }
    if (char === '\n') {
      return Result.ok(reader, '\n', 1)
    }
    if (char === '\r' && Reader.peek(reader, 1) === '\n') {
      return Result.ok(reader, '\r\n', 2)
    }
    return Result.fail(reader, 'expected end of line')
  }

export default eol
