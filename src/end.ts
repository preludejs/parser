import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser that matches end of input. */
export function end(reader: Reader.t): Result.t<''> {
  return Reader.end(reader) ?
    Result.ok(reader, 0, '') :
    Result.fail(reader, 0, 'expected end of input')
}

export default end
