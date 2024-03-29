import * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'
import lift from './lift.js'
import next from './next.js'

export const replace =
  <T extends Parser.Liftable>(input: string, parser: T, cb: (value: Parser.Parsed<T>, reader: Reader.t) => string) => {
    const reader = Reader.of(input)
    const lifted = lift(parser)
    const result = lifted(reader)
    if (Result.failed(result)) {
      return input
    }
    const replacement = cb(result.value as Parser.Parsed<T>, reader)
    const input_ = input.slice(0, reader.offset) + replacement + input.slice(reader.offset + result.length)
  }
