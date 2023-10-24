import * as Refute from './prelude-refute.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

export const refute =
  <A>(parser: Parser.t<A>, f: Refute.t<A>, reason = Refute.reasonWithReceived): Parser.t<A> =>
    reader => {
      const result = parser(reader)
      if (Result.failed(result)) {
        return result
      }
      const refutation = f(result.value)
      if (Refute.failed(refutation)) {
        return Result.fail(reader, reason(refutation))
      }
      return Result.ok(result.reader, result.value)
    }

export default refute
