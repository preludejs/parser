import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser matching string between `start` and `end` literals. */
export function betweenLiterals(start: string, end: string) {
  return function (reader: Reader.t) {
    if (!Reader.startsWith(reader, start)) {
      return Result.fail(reader, 0, `expected start literal ${start}`)
    }
    const offset = Reader.offsetOf(reader, end, start.length)
    if (offset === -1) {
      return Result.fail(reader, 0, `expected end literal ${end}`)
    }
    return Result.ok(reader, offset + end.length, Reader.slice(reader, start.length, offset))
  }
}

export default betweenLiterals
