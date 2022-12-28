import type * as Parser from './parser.js'
import * as Result from './result.js'

export default function maybe<A>(parser: Parser.t<A>): Parser.t<undefined | A> {
  return function (reader) {
    const result = parser(reader)
    return Result.failed(result) ?
      Result.ok<undefined>(reader, undefined) :
      result
  }
}
