import * as Reader from './reader.js'
import * as Result from './result.js'

export default function betweenLiterals(a: string, b: string) {
  return function (reader: Reader.t) {
    if (!Reader.startsWith(reader, a)) {
      return Result.fail(reader, `expected start literal ${a}`)
    }
    const offset = Reader.offsetOf(reader, b, a.length)
    if (offset === -1) {
      return Result.fail(reader, `expected end literal ${b}`)
    }
    return Result.ok(reader, Reader.slice(reader, a.length, offset), offset + b.length)
  }
}
