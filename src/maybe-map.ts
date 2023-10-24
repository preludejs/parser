import * as Result from './result.js'
import type * as Parser from './parser.js'

export const maybeMap =
  <A, B>(parser: Parser.t<A>, f: (result: Result.Ok<A>) => Result.t<B>): Parser.t<B> =>
    reader => {
      const result = parser(reader)
      return Result.failed(result) ?
        result :
        f(result)
    }

export default maybeMap
