import * as Reader from './reader.js'
import * as Result from './result.js'

export const line =
  (reader: Reader.t) => {
    let char = Reader.peek(reader)
    if (char === undefined) {
      return Result.fail(reader, 'expected line, got end of input')
    }
    let i = 0
    do {
      if (char === '\n') {
        return Result.ok(reader, Reader.slice(reader, 0, i), i + 1)
      }
      if (char === '\r' && Reader.peek(reader, i + 1) === '\n') {
        return Result.ok(reader, Reader.slice(reader, 0, i), i + 2)
      }
      char = Reader.peek(reader, ++i)
    } while (char !== undefined)
    return Result.ok(reader, Reader.slice(reader, 0, i), i)
  }

export default line
