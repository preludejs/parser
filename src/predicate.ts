import type * as Parser from './parser.js'
import type * as Reader from './reader.js'
import * as Result from './result.js'

/** Validates result with provided predicate. */
export function predicate<T>(parser: Parser.t<T>, f: (value: T) => boolean, reason = 'condition not met') {
  return function (reader: Reader.t) {
    const result = parser(reader)
    return Result.failed(result) ?
      result :
      f(result.value) ?
        result :
        Result.fail(reader, reason)
  }
}

export { predicate as pred }

export default predicate
