import * as Result from './result.js'
import type * as Parser from './parser.js'

export const rescue =
  <A, B>(parser: Parser.t<A>, f: (result: Result.Fail) => Result.t<B>): Parser.t<A | B> =>
    reader => {
      const result = parser(reader)
      return Result.failed(result) ?
        f(result) :
        result
    }

export default rescue
