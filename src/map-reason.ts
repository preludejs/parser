import * as Result from './result.js'
import type * as Parser from './parser.js'

export const mapReason =
  <A>(parser: Parser.t<A>, f: (reason: string) => string): Parser.t<A> =>
    reader => {
      const result = parser(reader)
      return Result.failed(result) ?
        Result.fail(result.reader, f(result.reason)) :
        result
    }

export default mapReason
