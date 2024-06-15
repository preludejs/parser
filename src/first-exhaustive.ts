import * as Reader from './reader.js'
import * as Result from './result.js'
import lift from './lift.js'
import type { Parser, Parsed, Liftable } from './parser.js'

export const firstExhaustive =
  <Parsers extends Liftable[]>(
    ...parsers: Parsers
  ): Parser<Parsed<Parsers[number]>> => {
    const liftedParsers = parsers.map(lift)
    return (reader: Reader.t) => {
      for (const parser of liftedParsers) {
        const result = parser(reader)
        if (!Result.failed(result) && Reader.end(result.reader)) {
          return result as Result.Ok<Parsed<Parsers[number]>>
        }
      }
      return Result.fail(reader, `None of ${parsers.length} alternatives matched at ${reader.offset}.`)
    }
  }

export {
  firstExhaustive as exhaustiveOr,
  firstExhaustive as exhaustiveUnion
}

export default firstExhaustive
