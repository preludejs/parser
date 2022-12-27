import { ok, failed, Parser } from './prelude.js'

const map =
  <A, B>(a: Parser<A>, f: (_: A) => B): Parser<B> =>
    input => {
      const a_ = a(input)
      return failed(a_) ?
        a_ :
        ok(a_.input, f(a_.value))
    }

export default map
