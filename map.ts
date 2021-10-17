import { ok, failed, Parser } from './prelude.js'

export const map =
  <A, B>(a: Parser<A>, f: (_: A) => B): Parser<B> =>
    input => {
      const a_ = a(input)
      return failed(a_) ?
        a_ :
        ok(a_[0], f(a_[1]))
    }

export default map
