import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
export function exhaustive<A>(parser: Parser.t<A>) {
  return function (input: string): A {
    const reader = Reader.of(input)
    const result = parser(reader)
    if (Result.failed(result)) {
      throw new Error(result.reason)
    }
    if (!Reader.end(result.reader)) {
      throw new Error(`Expected exhaustive result, unparsed ${result.reader.input.length - result.reader.offset}.`)
    }
    return result.value
  }
}

export default exhaustive
