import * as Result from './result.js'
import type * as Parser from './parser.js'

export const mapFailure =
  <A>(parser: Parser.t<A>, f: (result: Result.Fail) => Result.Fail): Parser.t<A> =>
    reader => {
      const result = parser(reader)
      return Result.failed(result) ?
        f(result) :
        result
    }

export default mapFailure
