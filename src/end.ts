import * as Reader from './reader.js'
import * as Result from './result.js'

/** @returns parser that matches end of input. */
export default function end(reader: Reader.t): Result.t<null> {
  return Reader.end(reader) ?
    Result.ok(reader, null) :
    Result.fail(reader, 'expected end of input')
}
