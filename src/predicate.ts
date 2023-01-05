import type * as Parser from './parser.js'
import type * as Reader from './reader.js'
import * as Result from './result.js'

/** Validates result with provided predicate. */
export function predicate<T>(parser: Parser.t<T>, predicate: (value: T) => boolean, reason = 'condition not met') {
  return function (reader: Reader.t) {
    const result = parser(reader)
    return Result.failed(result) ?
      result :
      predicate(result.value) ?
        result :
        Result.fail(reader, reason)
  }
}

export { predicate as pred }

export default predicate
