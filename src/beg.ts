import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser matching beginning of the input. */
export function beg(reader: Reader.t): Result.t<null> {
  return reader.offset === 0 ?
    Result.ok(reader, null) :
    Result.fail(reader, 'expected beginning of input')
}

export default beg
