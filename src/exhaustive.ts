import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
export default function exhaustive<A>(a: Parser.t<A>) {
  return function (input: string): A {
    const a_ = a(Reader.of(input))
    if (Result.failed(a_)) {
      throw new Error(a_.reason)
    }
    if (!Reader.end(a_.input)) {
      throw new Error(`Expected exhaustive result, unparsed ${a_.input.input.length - a_.input.offset}.`)
    }
    return a_.value
  }
}
