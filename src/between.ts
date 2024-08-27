import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser matching string between `start` and `end` literals. */
export function between(start: string, end = start) {
  return function (reader: Reader.t) {
    if (!Reader.startsWith(reader, start)) {
      return Result.fail(reader, `expected start literal ${start}`)
    }
    const offset = Reader.offsetOf(reader, end, start.length)
    if (offset === -1) {
      return Result.fail(reader, `expected end literal ${end}`)
    }
    return Result.ok(reader, Reader.slice(reader, start.length, offset), offset + end.length)
  }
}

export default between
