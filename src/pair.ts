import { ok, fail, failed, Parser } from './prelude.js'

const pair =
  <A, B>(a: Parser<A>, b: Parser<B>): Parser<[A, B]> =>
    input => {
      const a_ = a(input)
      if (failed(a_)) {
        return a_
      }
      const b_ = b(a_[0])
      if (failed(b_)) {
        return fail(input, b_[2])
      }
      return ok(b_[0], [ a_[1], b_[1] ])
    }

export default pair
