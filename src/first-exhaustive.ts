import type * as Parser from './parser.js'
import * as Reader from './reader.js'
import * as Result from './result.js'

export const firstExhaustive =
  <Parsers extends Parser.t<unknown>[]>(
  ...parsers: Parsers
  ): Parser.t<Parser.Parsed<Parsers[number]>> =>
    reader => {
      for (const parser of parsers) {
        const result_ = parser(reader)
        if (!Result.failed(result_) && Reader.end(result_.reader)) {
          return result_ as Result.Ok<Parser.Parsed<Parsers[number]>>
        }
      }
      return Result.fail(reader, `None of ${parsers.length} alternatives matched at ${reader.offset}.`)
    }

export {
  firstExhaustive as exhaustiveOr,
  firstExhaustive as exhaustiveUnion
}

export default firstExhaustive
