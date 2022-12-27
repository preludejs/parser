import { ok, fail, failed, Parser } from './prelude.js'

const pair =
  <A, B>(a: Parser<A>, b: Parser<B>): Parser<[A, B]> =>
    input => {
      const a_ = a(input)
      if (failed(a_)) {
        return a_
      }
      const b_ = b(a_.input)
      if (failed(b_)) {
        return fail(input, b_.reason)
      }
      return ok(b_.input, [ a_.value, b_.value ])
    }

export default pair
